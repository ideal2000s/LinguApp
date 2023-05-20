# frozen_string_literal: true

module TaskSessionRelations
  extend ActiveSupport::Concern

  included do
    has_many :task_item_sessions,
             dependent: :destroy,
             class_name: 'TaskItemSession',
             foreign_key: :task_session_id,
             inverse_of: :task_session

    accepts_nested_attributes_for :task_item_sessions
  end
end
