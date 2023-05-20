# frozen_string_literal: true

require 'database_cleaner'

DatabaseCleaner.allow_remote_database_url = true

RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
    # load Rails.root.join('db', 'seeds.rb')
  end

  config.before do |example|
    DatabaseCleaner.strategy =
      if example.metadata[:use_truncation] || example.metadata[:type] == :feature
        :truncation
      else
        :transaction
      end
    DatabaseCleaner.start
  end

  config.append_after do
    DatabaseCleaner.clean
  end
end
