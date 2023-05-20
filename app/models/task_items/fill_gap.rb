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
  class FillGap < ::TaskItem
    OPTIONS_RULE = Regexp.compile(/(?:\*select:([^*]+)\*)/)

    include AudioUploader::Attachment(:audio)

    belongs_to :task,
               class_name: 'Tasks::FillGap',
               inverse_of: :items,
               touch: true

    store_accessor :context, :statement, :audio_data
    acts_as_list scope: :task

    def clean_statement
      statement.gsub(OPTIONS_RULE, '**')
    end

    def answers
      iterate_options do |option, arr|
        arr.push(option[0].split('/').shuffle)
      end
    end

    def correct_answers
      iterate_options do |option, arr|
        arr.push(option[0].split('/').first)
      end
    end

    def functional?
      OPTIONS_RULE.match?(statement.to_s)
    end

    private

    def iterate_options(&block)
      statement.to_s.scan(OPTIONS_RULE).each_with_object([], &block)
    end
  end
end
