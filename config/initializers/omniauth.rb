# frozen_string_literal: true

require 'microsoft_graph_auth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2,
    ENV.fetch('GOOGLE_AUTH_ID', 'testid'),
    ENV.fetch('GOOGLE_AUTH_SECRET', 'testsecret'),
    scope: 'userinfo.email,userinfo.profile',
    skip_jwt: true,
    name: 'google_user'

  provider :google_oauth2,
    ENV.fetch('GOOGLE_AUTH_ID', 'testid'),
    ENV.fetch('GOOGLE_AUTH_SECRET', 'testsecret'),
    scope: 'userinfo.email,userinfo.profile',
    skip_jwt: true,
    name: 'google_student'

  provider :facebook, ENV.fetch('FACEBOOK_AUTH_ID', 'testid'), ENV.fetch('FACEBOOK_AUTH_SECRET', 'testsecret'),
    name: 'facebook_student',
    info_fields: 'email, first_name, last_name',
    image_size: 'large'

  provider :microsoft_graph_auth, ENV['AZURE_AUTH_ID'], ENV['AZURE_AUTH_SECRET'],
    name: 'microsoft_student'
end
