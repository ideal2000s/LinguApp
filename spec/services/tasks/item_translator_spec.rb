# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::ItemTranslator, type: :request do
  subject(:result) { described_class.call(item: item, locale: 'ru') }

  let(:source) { 'The sky is blue' }
  let(:target) { 'Небо голубое' }
  let(:task) { create :arrange_words_task }
  let(:item) { create :arrange_words_item, task: task, arrange_words: source }

  before { stub_google_translate(with: target) }

  specify 'translate task item content' do
    expect(result).to eq(target)
  end
end
