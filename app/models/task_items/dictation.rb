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
  class Dictation < ::TaskItem
    include AudioUploader::Attachment(:audio)

    mattr_accessor :clean_up_rule, instance_writer: false
    self.clean_up_rule = Regexp.new(/[^\s[:alnum:]-]+/).freeze

    belongs_to :task,
               class_name: 'Tasks::Dictation',
               inverse_of: :items,
               touch: true
    store_accessor :context, :sentence, :audio_data
    acts_as_list scope: :task

    def functional?
      audio_data.present? && sentence.present?
    end

    def description
      return false unless task.locale

      ::Tasks::ItemTranslator.call(item: self, locale: task.locale)
    end

    def translatable
      sentence
    end

    def clean_sentence
      sentence.to_s.gsub(clean_up_rule, '').downcase
    end
  end
end
