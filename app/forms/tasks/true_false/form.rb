# frozen_string_literal: true

module Tasks
  class TrueFalse::Form < BasicForm
    attribute :task, Tasks::TrueFalse
    attribute :score_method, String, default: 'fractional'
    attribute :cover_img, Boolean, default: ->(form, _attr) { form.task&.cover_img }
    attribute :video_url, String, default: ->(form, _attribute) { form.task&.video_url }
    validate :video_url_format

    def save
      if valid?
        persist!
        true
      else
        false
      end
    end

    def self.params_schema
      super.concat(%i[cover_img video_url])
    end

    private

    def persist!
      ActiveRecord::Base.transaction do
        @task.update(attributes.slice(:instruction, :introduction, :cover_img, :video_url))
      end
    end
  end
end
