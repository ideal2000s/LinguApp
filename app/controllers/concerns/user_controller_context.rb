# frozen_string_literal: true

module UserControllerContext
  extend ActiveSupport::Concern

  included do
    include UserLocaleSelector
    include UserDeviseHelpers
  end
end
