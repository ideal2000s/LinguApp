# frozen_string_literal: true

module Teach
  class PhrasesController < ApplicationController
    before_action :authorize_action

    def index
      respond_to do |format|
        format.html do
          render :index, locals: {
            lesson: lesson,
            phrases: lesson.phrases.order(:body),
            course: lesson.course
          }
        end
        format.json { render json: { status: 200, phrases: lesson.language.words.pluck(:body, :word_class) } }
      end
    end

    def create
      phrase_content = create_params[:phrase].split('(')
      phrase = if phrase_content.length == 1
                 Dictionary::Word.create!(body: phrase_content[0].downcase, language: lesson.language)
               else
                 Dictionary::Word.find_by(body: phrase_content[0][0...-1], language: lesson.language,
                                          word_class: phrase_content[1][0...-1])
               end
      lesson.lesson_phrases.find_or_create_by(phrase: phrase)

      render :create, locals: { lesson: lesson, phrases: lesson.phrases }
    end

    def destroy
      phrase = Dictionary::Word.find(params[:id])
      lesson.phrases.destroy(phrase)

      render :destroy, locals: { lesson: lesson, phrases: lesson.phrases }
    end

    def destroy_batch
      lesson.lesson_phrases.destroy_all

      render :destroy, locals: { lesson: lesson, phrases: lesson.phrases }
    end

    def generate
      result = LessonPhrases::Flows::Generate.call(lesson: lesson, course: course)

      result.on_failure { |failure| render :error, locals: { message: failure.value } }
            .on_success { render :create, locals: { lesson: lesson, phrases: lesson.phrases } }
    end

    private

    def authorize_action(record = lesson)
      authorize(record, 'edit?', policy_class: policy_class)
    end

    def policy_class
      Teach::LessonPolicy
    end

    def scope
      lesson.lesson_phrases
    end

    def lesson_scope
      policy_scope(Lesson, policy_scope_class: Teach::LessonPolicy::Scope)
    end

    def lesson
      @lesson ||= lesson_scope.find(params[:lesson_id])
    end

    def course
      # TODO: what?
      @course ||= lesson.course if params[:course_id]
    end

    def create_params
      params.require(:lesson).permit(:phrase)
    end
  end
end
