# frozen_string_literal: true

module Tasks
  class CreateForm < ::ApplicationForm
    attribute :lesson_id, Integer
    attribute :name, String
    attribute :complexity, String, default: 'low'
    attribute :performance, Float, default: 1.0
    attribute :type, String
    attribute :subject, String

    validates :name, presence: true
    validates :type, inclusion: { in: Task.types }
    validates :subject, inclusion: { in: Task.subjects.keys }
    validates :complexity, inclusion: { in: Task.complexities.keys }
    # validates :performance, inclusion: { in: 0.01..1 }

    def performance=(val)
      @performance = val.to_f
    end

    private

    def persist!
      Task.create!(attributes)
    end
  end
end
