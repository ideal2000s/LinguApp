# frozen_string_literal: true

module Students::API
  class StudentWordsController < ApplicationController
    def play
      result = StudentWords::Cases::Play.call(word: word, student: current_student, form: form)

      if result.success?
        head :ok
      else
        render json: { error: result.value }, status: :unprocessable_entity
      end
    end

    private

    def student_word_params
      params.permit(:solved)
    end

    def form
      StudentWords::PlayForm.new(student_word_params)
    end

    def word
      Dictionary::Word.find(params[:word_id])
    end
  end
end
