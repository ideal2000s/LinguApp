# frozen_string_literal: true

require 'rails_helper'

module School
  module HubSpot
    module Cases
      RSpec.describe CreateAssociation, type: :service do
        subject(:result) do
          described_class.call(team: team, user: user)
        end

        let(:hubspotid) { '123' }
        let(:hubspot_api_key) { 'hubspot-api-key' }
        let(:team) { create(:team, hubspotid: hubspotid) }
        let(:user) { create(:user, hubspotid: hubspotid) }
        let(:team_user) { create(:team_user, user: user, team: team) }
        let(:hubapi_url) { 'https://api.hubapi.com/crm/v3/objects/contacts' }
        let(:url) do
          "#{hubapi_url}/#{hubspotid}/associations/Company/#{hubspotid}/contact_to_company?hapikey=#{hubspot_api_key}"
        end
        let(:response_stub) do
          {
            associations: {
              contacts: {
                results: [
                  {
                    id: hubspotid,
                    type: 'contact_to_company'
                  }
                ]
              }
            },
            archived: false,
            id: hubspotid
          }
        end

        before do
          allow(ENV).to receive(:fetch).with('HUBSPOT_API_KEY').and_return(hubspot_api_key)
          team_user
          stub_request(:put, url)
            .with(
              headers: {
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ',
                'Content-Type' => 'application/json',
                'Expect' => '',
                'User-Agent' => 'hubspot-api-client-ruby; 9.3.0'
              }
            )
            .to_return(status: 200, body: response_stub.to_json, headers: {})
        end

        describe '#call' do
          it 'assigns hubspot_associated to team_user' do
            result
            expect(team_user.reload).to be_hubspot_associated
          end
        end
      end
    end
  end
end
