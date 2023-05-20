# frozen_string_literal: true

module StudentWords
  class PlayForm < ::ApplicationForm
    attribute :solved, Boolean

    validates :solved, inclusion: { in: [true, false] }
  end
end
