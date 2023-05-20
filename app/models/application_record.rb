# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def to_partial_path(prefix: nil, suffix: nil, partial: nil, skip_partial: false)
    path = super()
    path = "#{prefix}/#{path}" if prefix
    path = "#{path.split('/')[0...-1].join('/')}/#{partial}" if partial && !skip_partial
    path = path.split('/')[0...-1].join('/') if skip_partial
    path = "#{path}/#{suffix}" if suffix
    path
  end
end
