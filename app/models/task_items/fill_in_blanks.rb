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
  class FillInBlanks < ::TaskItem
    ANSWER_SEPARATOR = ':'
    OPTIONS_RULE = Regexp.compile(/(?:\*([^*]+)\*)/)

    include AudioUploader::Attachment(:audio)

    belongs_to :task,
               class_name: 'Tasks::FillInBlanks',
               inverse_of: :items,
               touch: true

    store_accessor :context, :question, :audio_data
    acts_as_list scope: :task

    def clean_question
      question.gsub(/\*[^*]+\*/, '**')
    end

    def answers
      question
        .scan(/\*([^*]+)\*/)
        .map(&:first)
        .map { |variants| variants.split(ANSWER_SEPARATOR) }
    end

    def functional?
      OPTIONS_RULE.match?(question.to_s)
    end
  end
end
