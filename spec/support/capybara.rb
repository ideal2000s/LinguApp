# frozen_string_literal: true

require 'capybara/rspec'
require 'selenium/webdriver'

Capybara.enable_aria_label = true
Capybara.register_driver(:selenium_chrome) do |app|
  Capybara::Selenium::Driver.load_selenium
  browser_options = ::Selenium::WebDriver::Chrome::Options.new.tap do |opts|
    # Workaround https://bugs.chromium.org/p/chromedriver/issues/detail?id=2650&q=load&sort=-id&colspec=ID%20Status%20Pri%20Owner%20Summary
    opts.args << '--disable-site-isolation-trials'
    opts.args << '--no-sandbox'
    opts.args << '--disable-dev-shm-usage'
  end
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: browser_options)
end

Capybara.register_driver(:selenium_chrome_headless) do |app|
  Capybara::Selenium::Driver.load_selenium
  browser_options = ::Selenium::WebDriver::Chrome::Options.new.tap do |opts|
    opts.args << '--headless'
    opts.args << '--no-sandbox'
    opts.args << '--disable-dev-shm-usage'
    opts.args << '--disable-site-isolation-trials'
  end
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: browser_options)
end

Capybara.configure do |config|
  config.match = :prefer_exact
  config.javascript_driver = :selenium_chrome_headless
  config.always_include_port = true
  config.server = :puma, { Silent: true }
end
