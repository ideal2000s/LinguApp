# frozen_string_literal: true

module Tasks
  class BasicForm < ::ApplicationForm
    attribute :name, String, default: ->(form, _attribute) { form.task&.name }
    attribute :introduction,
              String,
              default: ->(form, _attr) { form.task&.introduction }
    attribute :score_method,
              Integer,
              default: ->(form, _attribute) { form.task&.score_method }
    attribute :audio,
              Hash,
              default: ->(form, _attribute) { form.task&.audio_data }
    attribute :image,
              Hash,
              default: ->(form, _attribute) { form.task&.image_data }
    attribute :image_remote_link, String, default: ->(form, _attribute) { form.task&.image_remote_link }
    attribute :remove_audio, Boolean, default: false
    attribute :remove_image, Boolean, default: false
    attribute :published, Boolean, default: ->(form, _attribute) { form.task&.published }
    attribute :subject, String, default: ->(form, _attribute) { form.task&.subject }
    attribute :complexity, String, default: ->(form, _attribute) { form.task&.complexity }
    attribute :performance, Float, default: ->(form, _attribute) { form.task&.performance || 1.0 }

    validates :score_method, inclusion: { in: Task.score_methods.keys }
    validates :subject, inclusion: { in: Task.subjects.keys }
    validates :complexity, inclusion: { in: Task.complexities.keys }
    validates :name, presence: true
    validate :image_uniqueness

    def attributes(*args)
      super.except(:task).tap do |form_attributes|
        form_attributes[:remove_image] = true if form_attributes[:image_remote_link].present?
        form_attributes.delete(:image) if form_attributes[:image].blank? || form_attributes[:remove_image].present?
        form_attributes.delete(:audio) if form_attributes[:audio].blank?
        form_attributes[:introduction] = form_attributes[:introduction].to_s
      end
    end

    def introduction
      return super() unless task

      task.introduction = super() if super().is_a?(String)
      task.introduction
    end

    def self.params_schema
      %i[
        audio image introduction score_method name subject complexity published
        remove_audio remove_image image_remote_link
      ]
    end

    def self.model_name
      Task.model_name
    end

    def skip_introduction?
      false
    end

    def image_uniqueness
      return unless image.present? && image_remote_link.present?

      errors.add(:image, I18n.t(:invalid, scope: 'activerecord.errors.models.task.attributes.image'))
    end
  end
end
