# frozen_string_literal: true

module Teach
  class WordsController < ApplicationController
    # before_action :find_task
    # before_action :find_item, only: %i[edit update destroy move_up move_down]
    # before_action :authorize_action

    # TODO: move to separate controller
    def index
      words = Dictionary::Word.where('language_id = ? and body ILIKE ?', params[:language_id], "#{params[:q]}%")
      render :index, locals: { items: words }
    end

    def create
      item.task_item_words.create(create_params)

      respond_to do |f|
        f.js { render :item, locals: { task: task, item: item } }
      end
    end

    def destroy
      task_item_word.destroy

      respond_to do |f|
        # f.html { redirect_back(fallback_location: edit_admin_task_path(@task)) }
        f.js { render :item, locals: { task: task, item: item } }
      end
    end

    private

    def authorize_action(record = @task.lesson)
      # authorize(record, 'edit?', policy_class: policy_class)
    end

    def policy_class
      # Teach::LessonPolicy
    end

    def task
      @task ||= Task.find(params[:task_id])
    end

    def item
      @item ||= task.items.find(params[:item_id])
    end

    def current_team_user
      team.team_users.find_by(user: current_user)
    end

    def task_item_word
      @task_item_word ||= item.task_item_words.find(params[:id])
    end

    def create_params
      params.require(:task_item_word).permit(
        :word_id
      )
    end
  end
end
