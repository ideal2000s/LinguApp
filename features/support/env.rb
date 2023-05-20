# frozen_string_literal: true

require 'cucumber/rails'

ActionController::Base.allow_rescue = false

DatabaseCleaner.strategy = :transaction

Cucumber::Rails::Database.javascript_strategy = :truncation

Before('@browser') do
  Capybara.javascript_driver = :selenium_chrome
end
