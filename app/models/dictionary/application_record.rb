# frozen_string_literal: true

module Dictionary
  class ApplicationRecord < ActiveRecord::Base
    self.abstract_class = true
  end
end
