# frozen_string_literal: true

class TaskItems::BasicForm < ApplicationForm
  def attributes(*args)
    super.except(:item, :task)
  end

  def self.model_name
    TaskItem.model_name
  end
end
