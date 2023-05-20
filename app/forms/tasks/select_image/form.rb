# frozen_string_literal: true

module Tasks
  class SelectImage::Form < BasicForm
    attribute :task, Tasks::SelectImage
    attribute :score_method, String, default: 'fractional'
    attribute :cover_img, Boolean, default: ->(form, _attr) { form.task&.cover_img }

    def save
      if valid?
        persist!
        true
      else
        false
      end
    end

    def self.params_schema
      super.concat(%i[cover_img])
    end

    private

    def persist!
      ActiveRecord::Base.transaction do
        @task.update(attributes.slice(:introduction, :instruction, :cover_img))
      end
    end
  end
end
