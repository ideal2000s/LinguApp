# frozen_string_literal: true

module FormHelpers
  def select2(option, from:)
    find('label', text: from).sibling('.select2-container').click
    find('.select2-results__option', text: option).click
  end
end

World(FormHelpers)
