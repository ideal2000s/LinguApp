# frozen_string_literal: true

module Tasks
  class InlineDropdown::Form < BasicForm
    attribute :task, Tasks::InlineDropdown
    attribute :score_method, String, default: 'fractional'
    attribute :instruction,
              String,
              default: ->(form, _attr) { form.task&.instruction }
    attribute :video_url, String, default: ->(form, _attribute) { form.task&.video_url }
    validate :video_url_format

    def self.params_schema
      super.concat(%i[instruction video_url])
    end

    def save
      if valid?
        persist!
        true
      else
        false
      end
    end

    def skip_introduction?
      true
    end

    private

    def persist!
      ActiveRecord::Base.transaction do
        @task.update(attributes.slice(:instruction, :introduction, :title, :video_url))
      end
    end
  end
end
