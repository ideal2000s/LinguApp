# frozen_string_literal: true

module FormHelper
  def error_for(object, field)
    return unless object.errors.key?(field)

    tag.div(object.errors.messages[field.to_sym].first, class: 'error-message')
  end
end
