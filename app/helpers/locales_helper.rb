# frozen_string_literal: true

module LocalesHelper
  mattr_accessor :locales, instance_writer: false
  self.locales = %i[en nb es].freeze

  def language_selector_tag(*_args)
    render partial: 'layouts/shared/locale_selector'
  end

  def enabled_locales
    locales & I18n.available_locales
  end
end
