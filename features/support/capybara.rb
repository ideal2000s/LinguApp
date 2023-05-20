# frozen_string_literal: true

require 'capybara/rails'
require 'capybara/rspec'
require 'capybara-screenshot/cucumber'
require 'selenium/webdriver'

Capybara.default_max_wait_time = 5
Capybara.enable_aria_label = true
Capybara.disable_animation = true
Capybara::Screenshot.autosave_on_failure = ENV.key?('FAILED_SCREENSHOT')
Capybara.register_driver(:selenium_chrome) do |app|
  Capybara::Selenium::Driver.load_selenium
  browser_options = ::Selenium::WebDriver::Chrome::Options.new.tap do |opts|
    # Workaround https://bugs.chromium.org/p/chromedriver/issues/detail?id=2650&q=load&sort=-id&colspec=ID%20Status%20Pri%20Owner%20Summary
    opts.args << '--disable-site-isolation-trials'
    opts.args << '--no-sandbox'
    opts.args << '--disable-dev-shm-usage'
    opts.args << '--window-size=1920,1080'
  end
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: browser_options)
end

Capybara.register_driver(:selenium_chrome_headless) do |app|
  Capybara::Selenium::Driver.load_selenium
  browser_options = ::Selenium::WebDriver::Chrome::Options.new.tap do |opts|
    opts.args << '--headless'
    opts.args << '--disable-sync'
    opts.args << '--disable-background-mode'
    opts.args << '--disable-translate'
    opts.args << '--disable-gpu'
    opts.args << '--disable-plugins'
    opts.args << '--dns-prefetch-disable'
    opts.args << '--no-sandbox'
    opts.args << '--disable-dev-shm-usage'
    opts.args << '--disable-site-isolation-trials'
    opts.args << '--window-size=1920,1080'
  end
  options = { browser: :chrome, options: browser_options }
  if ENV.key?('CONSOLE_LOG')
    options[:desired_capabilities] = Selenium::WebDriver::Remote::Capabilities.chrome("goog:loggingPrefs": { browser: 'ALL' })
  end
  Capybara::Selenium::Driver.new(
    app,
    **options
  )
end

Capybara.configure do |config|
  config.match = :prefer_exact
  config.javascript_driver = :selenium_chrome_headless
  config.always_include_port = true
  config.server = :puma, { Silent: true }
end
