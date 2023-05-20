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
module OAuth
  class App < ApplicationRecord
    DEFAULT_OAUTH_SCOPE = 'offline offline_access openid profile'
    belongs_to :team

    before_validation :set_secret
    after_create :create_oauth_client
    before_update :update_oauth_client

    def secret_code
      SecureRandom.urlsafe_base64(64)
    end

    private

    def set_secret
      self.secret ||= SecureRandom.urlsafe_base64(64)
    end

    def create_oauth_client
      oauth_client = HydraAuth::Client.create(client_id: id,
                                              client_name: name,
                                              client_secret: secret,
                                              redirect_uris: redirect_uris,
                                              scope: DEFAULT_OAUTH_SCOPE)
      raise ActiveRecord::RecordInvalid unless oauth_client

      update(client_data: oauth_client.as_json)
    end

    def update_oauth_client
      oauth_client = HydraAuth::Client.fetch(client_id: id)

      oauth_client.update_attributes(client_name: name, # rubocop:disable Rails/ActiveRecordAliases
                                     client_secret: secret,
                                     redirect_uris: redirect_uris,
                                     scope: DEFAULT_OAUTH_SCOPE)

      assign_attributes(client_data: oauth_client.as_json)
    end
  end
end
