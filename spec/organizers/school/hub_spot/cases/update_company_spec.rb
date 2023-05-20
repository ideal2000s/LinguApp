# frozen_string_literal: true

require 'rails_helper'

module School
  module HubSpot
    module Cases
      RSpec.describe UpdateCompany, type: :service do
        subject(:result) do
          described_class.call(team: team, property: 'students_count', value: team.students.count)
        end

        let(:hubspotid) { '123' }
        let(:hubspot_api_key) { 'hubspot-api-key' }
        let(:team) { create(:team, hubspotid: hubspotid) }
        let(:properties) do
          {
            properties: {
              students_count: team.students.count
            }
          }
        end
        let(:response_stub) do
          {
            id: hubspotid,
            properties: {
              students_count: team.students.count
            }
          }
        end

        before do
          allow(ENV).to receive(:fetch).with('HUBSPOT_API_KEY').and_return(hubspot_api_key)
          stub_request(:patch, "https://api.hubapi.com/crm/v3/objects/companies/#{hubspotid}?hapikey=#{hubspot_api_key}")
            .with(
              body: properties.to_json,
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
          it 'responds with success' do
            expect(result).to be_success
          end
        end
      end
    end
  end
end
