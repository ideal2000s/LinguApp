# frozen_string_literal: true

module Categorize
  extend ActiveSupport::Concern
  included do
    enum subject: { teach: 0, engage: 1, test: 2 }

    def self.subjects_for_filter
      subjects.map do |k, v|
        [I18n.t(k, scope: 'activerecord.attributes.task.subjects'), v]
      end
    end

    def self.subjects_for_select
      subjects.map do |k, _v|
        [I18n.t(k, scope: 'activerecord.attributes.task.subjects'), k]
      end
    end
  end
end
