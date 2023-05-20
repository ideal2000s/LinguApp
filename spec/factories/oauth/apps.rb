# frozen_string_literal: true

# == Schema Information
#
# Table name: oauth_apps
#
#  id            :uuid             not null, primary key
#  name          :string           not null
#  secret        :string           not null
#  redirect_uris :string           default([]), not null, is an Array
#  team_id       :integer
#  client_data   :jsonb            not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
FactoryBot.define do
  factory :oauth_app, class: 'OAuth::App' do
    name { 'MyApp' }
    secret { nil }
    redirect_uris { %w[http://example.com/callback] }

    before(:create) { OAuth::App.skip_callback(:create, :after, :create_oauth_client, raise: false) }
  end
end
