# frozen_string_literal: true

module TaskTypedRelations
  extend ActiveSupport::Concern

  included do
    has_many :task_sessions,
             dependent: :destroy,
             class_name: 'TaskSession',
             foreign_key: :task_id,
             inverse_of: :task
  end
end
