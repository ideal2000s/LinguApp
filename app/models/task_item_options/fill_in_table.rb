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
  class FillInTable < ::TaskItemOption
    ANSWER_SEPARATOR = ':'

    belongs_to :item,
               class_name: 'TaskItems::FillInTable',
               foreign_key: :task_item_id,
               inverse_of: :options,
               touch: true

    store_accessor :context, :answer
    validates :answer, presence: true

    def split_answers
      answer.split(ANSWER_SEPARATOR)
    end

    class << self
      def params_schema
        %i[correct answer]
      end
    end
  end
end
