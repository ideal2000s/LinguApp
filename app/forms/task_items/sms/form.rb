# frozen_string_literal: true

module TaskItems
  class SMS::Form < TaskItems::BasicForm
    attribute :item, TaskItems::SMS
    attribute :task, Tasks::SMS
    attribute :message, String, default: ->(form, _attr) { form.item&.message }
    attribute :partner_name,
              String,
              default: ->(form, _attr) { form.item&.partner_name }
    validates :message, presence: true
    validates :partner_name, presence: true

    def self.params_schema
      %i[message position partner_name]
    end
  end
end
