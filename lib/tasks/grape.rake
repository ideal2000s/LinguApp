# frozen_string_literal: true

namespace :grape do
  desc 'routes'
  task routes: :environment do
    API::Base.routes.each do |route|
      method = route.request_method.ljust(10)
      path = route.path
      puts "#{method} #{path}"
    end
  end
end
