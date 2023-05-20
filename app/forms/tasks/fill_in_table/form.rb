# frozen_string_literal: true

module Tasks
  class FillInTable::Form < BasicForm
    attribute :task, Tasks::FillInTable
    attribute :score_method, String, default: 'fractional'
    attribute :columns, Integer, default: ->(form, _attr) { form.task&.columns }
    attribute :question_format,
              String,
              default: ->(form, _attr) { form.task&.question_format || FillInTable::TEXT_QUESTION_FORMAT }
    attribute :h1, String, default: ->(form, _attr) { form.task&.h1 }
    attribute :h2, String, default: ->(form, _attr) { form.task&.h2 }
    attribute :h3, String, default: ->(form, _attr) { form.task&.h3 }
    attribute :has_demo, Boolean, default: ->(form, _attr) { form.task&.has_demo }
    attribute :cover_img, Boolean, default: ->(form, _attr) { form.task&.cover_img }
    attribute :question_demo, String, default: ->(form, _attr) { form.task&.question_demo }
    attribute :column1_demo, String, default: ->(form, _attr) { form.task&.column1_demo }
    attribute :column2_demo, String, default: ->(form, _attr) { form.task&.column2_demo }
    attribute :audio_question_demo,
              Hash,
              default: ->(form, _attribute) { form.task&.audio_question_demo_data }
    attribute :video_url, String, default: ->(form, _attribute) { form.task&.video_url }
    validate :video_url_format
    # validates :audio_question_demo,
    #           file_size: {
    #             less_than_or_equal_to: 20.megabytes,
    #             message: 'Audio should be less than %{count}'
    #           },
    #           file_content_type: {
    #             allow: %w[audio/mpeg audio/x-mpeg audio/mp3 audio/x-mp3 audio/mpeg3 audio/x-mpeg3]
    #           },
    #           allow_nil: true

    def save
      if valid?
        persist!
        true
      else
        false
      end
    end

    def self.params_schema
      super.concat(%i[columns question_format h1 h2 h3 has_demo question_demo
                      column1_demo column2_demo audio_question_demo cover_img video_url])
    end

    def attributes(*args)
      super.except(:task).tap do |form_attributes|
        %i[audio_question_demo remove_audio_question_demo question_demo column1_demo column2_demo cover_img].each do |field_name|
          form_attributes.delete(field_name) if form_attributes[field_name].blank?
        end
      end
    end

    private

    def persist!
      ActiveRecord::Base.transaction do
        @task.update(
          attributes
            .slice(
              %i[instruction introduction columns question_format h1 h2 h3 cover_img
                 has_demo question_demo column1_demo column2_demo audio_question_demo video_url]
            )
        )
      end
    end
  end
end
