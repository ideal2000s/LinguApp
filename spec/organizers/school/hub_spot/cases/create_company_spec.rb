# frozen_string_literal: true

require 'rails_helper'

module School
  module HubSpot
    module Cases
      RSpec.describe CreateCompany, type: :service do
        subject(:result) do
          described_class.call(team: team)
        end

        let(:hubspot_api_key) { 'hubspot-api-key' }
        let(:team) { create(:team) }
        let(:properties) do
          {
            properties: {
              name: team.name
            }
          }
        end
        let(:response_stub) do
          {
            id: '512'
          }
        end

        before do
          allow(ENV).to receive(:fetch).with('HUBSPOT_API_KEY').and_return(hubspot_api_key)
          stub_request(:post, 'https://api.hubapi.com/crm/v3/objects/companies?hapikey=hubspot-api-key')
            .with(
              body: properties.as_json,
              headers: {
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ',
                'Content-Type' => 'application/json',
                'Expect' => '',
                'User-Agent' => 'hubspot-api-client-ruby; 9.3.0'
              }
            )
            .to_return(status: 200, body: response_stub.to_json, headers: {})
          team
        end

        describe '#call' do
          it 'assigns hubspotid to team' do
            expect { result }.to change(team, :hubspotid).to(response_stub[:id])
          end
        end
      end
    end
  end
end
