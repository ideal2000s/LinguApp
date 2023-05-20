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

module TaskItemOptions
  class SelectImage < ::TaskItemOption
    include ImageUploader::Attachment(:image)

    belongs_to :item,
               class_name: 'TaskItems::SelectImage',
               foreign_key: :task_item_id,
               inverse_of: :options,
               touch: true

    validates :image, presence: true

    class << self
      def params_schema
        %i[correct image]
      end
    end
  end
end
