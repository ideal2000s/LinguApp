# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SvgUploader, type: :uploader do
  let(:svg_file) { File.open(fixture_file('sample_svg.svg')) }

  it 'uploads svg file' do
    svg_uploader = described_class.new(:store)
    uploaded_file = svg_uploader.upload(svg_file)
    expect(uploaded_file).to be_present
  end
end
