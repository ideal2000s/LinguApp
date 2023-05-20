# frozen_string_literal: true

module LiberalEnum
  extend ActiveSupport::Concern

  class LiberalEnumType < ActiveRecord::Enum::EnumType
    # suppress <ArgumentError>
    # returns a value to be able to use +inclusion+ validation
    def assert_valid_value(value)
      value
    end
  end

  class_methods do
    def liberal_enum(attribute)
      decorate_attribute_type(attribute) do |subtype|
        LiberalEnum::LiberalEnumType.new(attribute, public_send(attribute.to_s.pluralize), subtype)
      end
    end
  end
end
