# frozen_string_literal: true

module Students
  module SharedCatalogueFilters
    extend ActiveSupport::Concern
    included do
      scope :with_level, (lambda do |*levels_array|
        where('level = ANY(ARRAY[?]::integer[])',
              levels_array.map { |level| levels.fetch(level) })
      end)
    end
    class_methods do
      def ransackable_scopes(_auth_object = nil)
        super.concat(%w[with_level])
      end
    end
  end
end
