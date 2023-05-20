# frozen_string_literal: true

module School
  class BaseFactory
    include PasswordGenerator

    protected

    def extract_language(language_data)
      return unless language_data

      active_language = Language.where(code: language_data).first
      active_language = Language.where('LOWER(TRIM(system_name)) = LOWER(TRIM(?))', language_data).first if active_language.blank?
      return active_language.id if active_language.present?

      for_each_language do |language|
        break language.id if language.name_translations.present? && language.name_translations.values.include?(language_data)
      end
    end

    def for_each_language(&block)
      @languages ||= Language.all
      @languages.each(&block)
      nil
    end
  end
end
