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
  class ArrangeWords < ::TaskItem
    include AudioUploader::Attachment(:audio)

    belongs_to :task,
               class_name: 'Tasks::ArrangeWords',
               inverse_of: :items,
               touch: true
    store_accessor :context, :arrange_words, :additional_words, :audio_data, :hint
    acts_as_list scope: :task

    def words
      (arrange_words.to_s.split(/\s/) + additional_words.to_s.split(/\s/)).shuffle
    end

    def description
      return false unless task.locale

      ::Tasks::ItemTranslator.call(item: self, locale: task.locale)
    end

    def translatable
      arrange_words
    end

    def functional?
      return false unless arrange_words

      arrange_words.split.size >= 3
    end
  end
end
