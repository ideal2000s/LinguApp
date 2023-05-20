# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TaskItems::TrueFalse::Form, type: :model do
  subject(:form) { described_class.new(params) }

  let(:params) do
    {
      statement: 'Example statement',
      veracity: veracity
    }
  end
  let(:veracity) { true }

  describe 'string veracity true' do
    let(:veracity) { 'true' }

    it { is_expected.to be_valid }
    it { expect(form.veracity).to be_truthy }
  end

  describe 'string veracity false' do
    let(:veracity) { 'false' }

    it { is_expected.to be_valid }
    it { expect(form.veracity).to be_falsey }
  end

  describe 'veracity nil' do
    let(:veracity) { nil }

    it { is_expected.not_to be_valid }
  end

  describe 'string veracity 0' do
    let(:veracity) { '0' }

    it { is_expected.to be_valid }
    it { expect(form.veracity).to be_falsey }
  end

  describe 'string veracity 1' do
    let(:veracity) { '1' }

    it { is_expected.to be_valid }
    it { expect(form.veracity).to be_truthy }
  end

  describe 'Model validations' do
    context 'when valid params' do
      it { is_expected.to be_valid }
    end

    context 'when invalid params' do
      let(:params) { super().merge(statement: nil) }

      it { is_expected.to be_invalid }
    end

    it { is_expected.to validate_presence_of(:statement) }
  end
end
