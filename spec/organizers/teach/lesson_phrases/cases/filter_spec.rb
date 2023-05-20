# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::LessonPhrases::Cases::Filter do
  subject(:result) { described_class.call(lesson: lesson, phrases: %w[1976 an alpha or beta]) }

  let(:lesson) { create(:lesson) }

  it 'filters phrases' do
    expect(result.value).to eq(lesson: lesson, phrases: %w[alpha beta])
  end
end
