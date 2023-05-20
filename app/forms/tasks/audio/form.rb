# frozen_string_literal: true

module Tasks
  class Audio::Form < BasicForm
    attribute :task, Tasks::Audio
    attribute :score_method, String, default: 'manual'
    attribute :video_url, String, default: ->(form, _attribute) { form.task&.video_url }
    attribute :cover_img, Boolean, default: ->(form, _attr) { form.task&.cover_img }
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
      super.concat(%i[video_url])
    end

    private

    def persist!
      ActiveRecord::Base.transaction do
        @task.update(attributes.slice(:title, :instruction, :minimum_duration, :introduction, :video_url))
      end
    end
  end
end
