# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Auth::Cases::StudentFromOmniauth do
  subject(:result) { described_class.call(oauth_hash: oauth_hash, timezone: timezone) }

  let(:oauth_hash) do
    {
      provider: 'google_student',
      uid: 'someuid',
      info: {
        email: 'student@example.com',
        first_name: 'fname',
        last_name: 'lname',
        image: image
      }
    }
  end
  let(:timezone) { 'Norway/Oslo' }

  let(:student) { create(:student, email: oauth_hash.dig(:info, :email)) }
  let(:student_identity) do
    create(:student_identity, student: student, uid: oauth_hash[:uid], provider: oauth_hash[:provider])
  end
  let(:image) { nil }

  context 'with new student' do
    it { is_expected.to be_success }

    it do
      expect(result.value[:student]).to be_persisted
    end
  end

  context 'with existing student, no identity' do
    before { student }

    it { is_expected.to be_success }

    it do
      expect(result.value[:student].id).to eq(student.id)
    end
  end

  context 'with existing student and identity' do
    before do
      student
      student_identity
    end

    it { is_expected.to be_success }

    it do
      expect(result.value[:student].id).to eq(student.id)
    end
  end

  describe 'Avatar upload' do
    context 'with url image' do
      let(:image) { 'https://via.placeholder.com/1' }

      before do
        stub_request(:get, image)
          .with(
            headers: { 'Accept' => '*/*' }
          ).to_return(status: 200, body: IO.binread(fixture_file('image.jpg')), headers: {})
      end

      it { is_expected.to be_success }

      it do
        expect(result.value[:student].avatar).to be_present
      end
    end

    context 'with bin image' do
      let(:image) { StringIO.new(fixture_file('image.jpg').read) }

      it { is_expected.to be_success }

      it do
        expect(result.value[:student].avatar).to be_present
      end
    end
  end
end
