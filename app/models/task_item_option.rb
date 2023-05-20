# frozen_string_literal: true

# == Schema Information
#
# Table name: task_item_options
#
#  id           :bigint           not null, primary key
#  task_item_id :bigint
#  correct      :boolean
#  text_option  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  context      :jsonb            not null
#  type         :string
#

class TaskItemOption < ApplicationRecord
  include TaskItemOptions::ImageUploader::Attachment(:image)
  store_accessor :context, :image_data
  belongs_to :item,
             class_name: 'TaskItem',
             inverse_of: :items

  def params_schema
    self.class.params_schema
  end

  def readonly?
    persisted? && item.task.snapshot?
  end
end
