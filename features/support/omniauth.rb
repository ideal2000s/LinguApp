# frozen_string_literal: true

module OmniauthHelpers
  INFO = OmniAuth::AuthHash::InfoHash.new(
    first_name: 'first_name',
    last_name: 'last_name',
    location: 'location,state,country',
    name: 'first_name last_name',
    nickname: 'first_name.last_name',
    email: 'yourname@email.com',
    verified: true
  )

  EXTRA_INFO = Hashie::Mash.new(raw_info: Hashie::Mash.new(
    email: 'yourname@email.com',
    first_name: 'first_name',
    gender: 'female',
    id: '123456',
    last_name: 'last_name',
    link: 'http://www.facebook.com/url&#8221',
    lang: 'fr',
    locale: 'en_US',
    name: 'first_name last_name',
    timezone: 5.5,
    updated_time: '2012-06-08T13:09:47+0000',
    username: 'fname.lname',
    verified: true,
    followers_count: 100,
    friends_count: 1000,
    created_at: '2017-06-08T13:09:47+0000'
  ))

  CREDENTIAL = OmniAuth::AuthHash::InfoHash.new(
    token: '2735246777-jlOnuFlGlvybuwDJfyrIyESLUEgoo6CffyJCQUO',
    secret: 'o0cu6ACtypMQfLyWhme3Vj99uSds7rjr4szuuTiykSYcN'
  )

  BASIC_INFO = {
    uid: '1234567',
    info: INFO,
    extra: EXTRA_INFO,
    credentials: CREDENTIAL
  }.freeze

  def mock_oauth(identity, fields_override = {})
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[identity.provider.to_sym] = OmniAuth::AuthHash.new(
      BASIC_INFO.merge(
        provider: identity.provider,
        uid: identity.uid,
        info: INFO.merge(fields_override)
      )
    )
  end
end

World(OmniauthHelpers)
