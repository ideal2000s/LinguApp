# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '~> 2.7.2'

# Basic
gem 'aws-sdk-s3', '~> 1.87.0', require: false
gem 'file_validators', '~> 3.0.0'
gem 'jbuilder', '~> 2.10'
gem 'pg', '>= 0.18', '< 2.0'
gem 'pg_search', '~> 2.3', '>= 2.3.5'
gem 'puma', '~> 5.1.1'
gem 'rack-cors'
gem 'rails', '~> 6.1.0'
gem 'slim', '~> 4.1.0'
gem 'webpacker', '~> 5.2.1'

# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# File uploading
gem 'fastimage', '~> 2.2.1'
gem 'image_processing', '~> 1.12.1'
gem 'mini_magick', '~> 4.11.0'
gem 'shrine', '~> 3.3.0'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
#
#
# OOD
gem 'u-case', '~> 2.6.0'
gem 'virtus', '~> 1.0.5'

# Authentication and authorization
gem 'deep_cloneable', github: 'AdeptLMS/deep_cloneable', ref: '115d499', require: false
gem 'devise', '~> 4.7.0'
gem 'devise_auto_otp', path: './gems/devise_auto_otp'
gem 'devise-jwt', '~> 0.8.0'
gem 'omniauth', '~> 1.9'
gem 'omniauth-facebook', '~> 8.0.0'
gem 'omniauth-google-oauth2', '~> 0.8.1'
gem 'pundit', '~> 2.1.0'
gem 'request_store', '~> 1.5.0'

# I18n
gem 'easy_translate'
gem 'http_accept_language', '~> 2.1.1'
gem 'i18n-js', '~> 3.8.0'
gem 'i18n-tasks', '~> 0.9.33'
gem 'json_translate', '~> 4.0.0'
gem 'rails-i18n', '~> 6.0.0'

# Integrations
gem 'hubspot-api-client'

# Friendly URL
gem 'friendly_id', '~> 5.4.2'

# Models and resources
gem 'aasm', '~> 5.1.1'
gem 'acts_as_list', '~> 1.0.3'
gem 'chronic', '~> 0.10.2' # Chronic is a pure Ruby natural language date parser.
gem 'chronic_duration', '~> 0.10.6' # A simple Ruby natural language parser for elapsed time
gem 'counter_culture', '~> 2.7.0'
gem 'countries', require: 'countries/global'
gem 'discard', '~> 1.1'
gem 'faraday', '~> 1.0.1'
gem 'faraday_middleware', '~> 1.0.0'
gem 'geocoder', '~> 1.6', '>= 1.6.4'
gem 'money-rails', '~> 1.13.4'
gem 'paper_trail', '~> 11.1.0'
gem 'public_activity', github: 'AdeptLMS/public_activity', branch: 'feature/rails-6.1'
gem 'public_suffix', '~> 4.0', '>= 4.0.6'
gem 'ransack', '~> 2.4.1'
gem 'scenic', '~> 1.5.4'
gem 'sentry-rails', '~> 4.1.6'
gem 'sentry-ruby', '~> 4.1.5'
gem 'timezone', '~> 1.2', '>= 1.2.5'

# pagination
gem 'kaminari', '~> 1.2.0'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.6.0', require: false

# Email services
gem 'sendgrid-actionmailer', github: 'AdeptLMS/sendgrid-actionmailer', branch: 'use-html-body'

gem 'browser'
gem 'e2mmap'
gem 'html_to_plain_text'
gem 'nokogiri'
gem 'redis', '~> 4.2.5'
gem 'redis-namespace', '~> 1.8.0'
gem 'roo', '~> 2.7', '>= 2.7.1'
gem 'roo-xls'
gem 'shell'
gem 'sidekiq', '~> 6.1.2'
gem 'sidekiq-cron'
gem 'silencer', '~> 1.0.1'
gem 'spidr', '~> 0.6.0'
gem 'sync'

# API
gem 'grape', '~> 1.4.0'
gem 'grape-entity', '~> 0.7.1'
gem 'grape-swagger', '~> 0.33.0'
gem 'grape-swagger-entity', '~> 0.3.4'
gem 'grape-swagger-rails', '~> 0.3.1'
gem 'oj', '~> 3.10'
gem 'oj_mimic_json', '~> 1.0'
gem 'olive_branch', '~> 3.0.0'

# Views
gem 'best_in_place', github: 'AdeptLMS/best_in_place', ref: 'a3560e8'
gem 'cocoon', '~> 1.2.15'

# gem 'dictionary', path: 'engines/dictionary'

group :development, :test do
  gem 'annotate', '~> 3.0'
  gem 'awesome_print'
  gem 'cucumber-rails', '~> 2.2.0', require: false
  gem 'dotenv-rails', '~> 2.7.5', require: 'dotenv/rails-now'
  gem 'factory_bot_rails', '~> 6.1.0'
  gem 'faker', '~> 2.15.1'
  gem 'foreman', '~> 0.87.0', require: false
  gem 'guard', '~> 2.15', require: false
  gem 'guard-cucumber', '~> 2.1', require: false, github: 'AnatoliiD/guard-cucumber'
  gem 'guard-rspec', '~> 4.7', require: false
  gem 'letter_opener', '~> 1.7.0'
  gem 'pry-byebug', '~> 3.7'
  gem 'rspec-rails', '~> 4.0.0'
  gem 'simplecov', '~> 0.20', require: false
end

group :development do
  gem 'bullet', '~> 6.1.3'
  gem 'listen', '~> 3.3'
  gem 'rubocop', '~> 1.6', require: false
  gem 'rubocop-rails', '~> 2.9.1', require: false
  gem 'rubocop-rspec', '~> 2.1.0', require: false
  gem 'spring', '~> 2.1.1'
  gem 'spring-commands-cucumber', '~> 1.0.1', require: false
  gem 'spring-commands-rspec', '~> 1.0.4', require: false
  gem 'spring-watcher-listen', '~> 2.0.1'
  gem 'web-console', '>= 3.3'
end

group :test do
  gem 'capybara', '~> 3.35'
  gem 'capybara-screenshot', '~> 1.0.24'
  gem 'database_cleaner', '~> 1.8.5'
  gem 'fakeredis', '~> 0.8.0'
  gem 'launchy', '~> 2.4'
  gem 'rails-controller-testing', '~> 1.0'
  gem 'selenium-webdriver', '~> 3.142'
  gem 'shoulda-matchers', '~> 4.5'
  gem 'webmock', '~> 3.11.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]

gem 'irb', '~> 1.3.0'
