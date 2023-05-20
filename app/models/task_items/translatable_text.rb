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
  class TranslatableText < ::TaskItem
    belongs_to :task,
               class_name: 'Tasks::TranslatableText',
               inverse_of: :items,
               touch: true

    before_save :empty_translations, if: :content_changed?

    store_accessor :context, :content

    def translation(source:, target: nil)
      target ||= current_work_language
      return content if source == target

      translations[target] = translations.fetch(target) do
        EasyTranslate.translate(content, from: source, to: target, html: true)
      end
      save!
      translations[target]
    rescue StandardError => e
      Raven.capture_exception(e)
      content
    end

    private

    def empty_translations
      self.translations = {}
    end

    def current_work_language
      Student.current&.support_languages&.first&.code || I18n.locale.to_s
    end
  end
end
