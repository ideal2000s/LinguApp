# frozen_string_literal: true

# == Schema Information
#
# Table name: task_items
#
#  id           :bigint           not null, primary key
#  task_id      :bigint
#  type         :string           not null
#  context      :jsonb            not null
#  discarded_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  position     :integer          default(0), not null
#  translations :jsonb
#

module TaskItems
  class Audition < ::TaskItem
    belongs_to :task,
               class_name: 'Tasks::Audition',
               inverse_of: :items,
               touch: true
    has_one :task_item_word,
            inverse_of: :task_item,
            foreign_key: :task_item_id,
            dependent: :destroy
    has_one :word, through: :task_item_word
    has_one :lesson, through: :task

    store_accessor :context, :start

    attr_writer :start_string

    accepts_nested_attributes_for :task_item_word

    delegate :word_class, to: :word, allow_nil: true
    delegate :id, :body, to: :word, prefix: true, allow_nil: true

    def start_string
      Time.at(start).utc.strftime('%H:%M:%S')
    end

    def similar_words
      lesson
        .phrases
        .where.not(id: word.id)
        .where('dictionary_words.body LIKE ?', "#{word.body.first}%")
    end

    def functional?
      task_item_word.present?
    end
  end
end
