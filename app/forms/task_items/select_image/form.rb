# frozen_string_literal: true

module TaskItems
  class SelectImage::Form < TaskItems::BasicForm
    attribute :item, TaskItems::SelectImage
    attribute :task, Tasks::SelectImage
    attribute :question, String, default: ->(form, _attr) { form.item&.question }
    validates :question, presence: true

    def self.params_schema
      %i[question]
    end
  end
end
