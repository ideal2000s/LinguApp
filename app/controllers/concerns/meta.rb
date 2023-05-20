# frozen_string_literal: true

module Meta
  extend ActiveSupport::Concern

  included do
    attr_accessor :__page_title

    helper_method :set_page_title
    helper_method :page_title
  end

  def set_page_title(title) # rubocop:disable Naming/AccessorMethodName
    @__page_title = title
  end

  def page_title
    parts = []
    parts << @__page_title if @__page_title.present?
    parts << t('app_name')
    parts.join(' | ')
  end
end
