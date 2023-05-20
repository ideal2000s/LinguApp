# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::ImageUploader, use_truncation: true do
  subject(:image) { task.image }

  let(:derivatives) { task.image_derivatives }
  let(:task) do
    Tasks::SelectText.create(
      attributes_for(:select_text_task)
        .merge(
          image: fixture_file('image.jpg'),
          lesson: create(:lesson)
        )
    )
  end

  before do
    task.image_derivatives!
  end

  it 'extracts metadata', aggregate_failures: true do
    expect(image.mime_type).to eq('image/jpeg')
    expect(image.extension).to eq('jpg')
    expect(image.size).to be_instance_of(Integer)
    expect(image.width).to be_instance_of(Integer)
    expect(image.height).to be_instance_of(Integer)
  end

  it 'generates derivatives', aggregate_failures: true do
    expect(derivatives[:thumbnail]).to be_kind_of(Shrine::UploadedFile)
    expect(derivatives[:content]).to be_kind_of(Shrine::UploadedFile)
  end
end
