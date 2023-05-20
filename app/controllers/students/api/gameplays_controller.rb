# frozen_string_literal: true

module Students::API
  class GameplaysController < ApplicationController
    include LessonFinders

    def create
      result = Gameplays::Flows::Create.call(words: lesson.phrases, student: current_student)

      if result.success?
        render locals: {
          gameplay: result.value[:gameplay],
          words: result.value[:words],
          student: current_student
        }
      else
        render json: { error: result.value }
      end
    end

    def finish
      form = Gameplays::FinishForm.new(finish_params)
      result = Gameplays::Cases::Finish.call(form: form, gameplay: gameplay)

      if result.success?
        head :ok
      else
        render json: { error: result.value }
      end
    end

    private

    def finish_params
      params.require(:gameplay).permit(:time_spent, :attempts, :xp_earned)
    end

    def gameplay
      Gameplay.find(params[:id])
    end
  end
end
