# frozen_string_literal: true

module Tasks
  class ItemTranslator
    attr_accessor :item, :locale, :translator

    def initialize(item:, locale:, translator: EasyTranslate)
      self.item = item
      self.locale = locale
      self.translator = translator
    end

    def self.call(**args)
      new(**args).call
    end

    def call
      item.translations.fetch(locale) do
        item.translations[locale] = translator.translate(item.translatable, to: locale)
      end
    rescue StandardError # handle network or logic errors with translation services
      item.translatable
    end
  end
end
