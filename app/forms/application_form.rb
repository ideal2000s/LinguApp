# frozen_string_literal: true

class ApplicationForm
  include Virtus.model
  include ActiveModel::Model
  include VideoURLType

  def save
    if valid?
      persist!
      true
    else
      false
    end
  end

  def self.reflect_on_association(_association)
    false
  end
end
