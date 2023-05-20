# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Converters::URLToPDF, type: :service do
  let(:pdf_body) { file_fixture('document.pdf').read }
  let(:url) { 'https://example.com/body_html' }

  before do
    stub_request(:post, described_class::CONVERTER_URL)
      .with(
        body: { url: url }.to_json
      )
      .to_return(status: 200, body: pdf_body)
  end

  describe '.call' do
    it 'Calls Faraday post on converter service with provided args' do
      expect(
        described_class.new(url).call
      ).to eq(pdf_body)
    end
  end
end
