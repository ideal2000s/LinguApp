# frozen_string_literal: true

module Tasks
  class Text::Form < BasicForm
    attribute :task, Tasks::Text
    attribute :score_method, String, default: 'no_score'
    attribute :cover_img, Boolean, default: ->(form, _attr) { form.task&.cover_img }

    def save
      if valid?
        persist!
        true
      else
        false
      end
    end

    def skip_introduction?
      false
    end

    def self.params_schema
      super.concat(%i[cover_img])
    end

    private

    def persist!
      ActiveRecord::Base.transaction do
        @task.update(attributes.slice(:name, :introduction, :cover_img))
      end
    end
  end
end
