# frozen_string_literal: true

# == Schema Information
#
# Table name: students
#
#  id                                 :bigint           not null, primary key
#  fname                              :string
#  lname                              :string
#  email                              :string           default(""), not null
#  mobile                             :string
#  locale                             :string
#  discarded_at                       :datetime
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#  gender                             :integer          default("unknown"), not null
#  ssn                                :string           default(""), not null
#  encrypted_password                 :string           default(""), not null
#  reset_password_token               :string
#  reset_password_sent_at             :datetime
#  remember_created_at                :datetime
#  team_followings_count              :integer          default(0)
#  avatar_data                        :text
#  active_student_target_language_id  :integer
#  student_words_count                :integer          default(0), not null
#  student_rewards_count              :integer          default(0)
#  otp_secret                         :string
#  last_otp_at                        :datetime
#  failed_attempts                    :integer          default(0), not null
#  unlock_token                       :string
#  locked_at                          :datetime
#  native_student_support_language_id :integer
#  sign_in_count                      :integer          default(0), not null
#  current_sign_in_at                 :datetime
#  last_sign_in_at                    :datetime
#  current_sign_in_ip                 :string
#  last_sign_in_ip                    :string
#  time_zone                          :string
#

require 'rails_helper'

RSpec.describe Student, type: :model do
  describe 'Table structure' do
    it { is_expected.to have_db_column(:fname).of_type(:string) }
    it { is_expected.to have_db_column(:lname).of_type(:string) }
    it { is_expected.to have_db_column(:email).of_type(:string) }
    it { is_expected.to have_db_column(:mobile).of_type(:string) }
    it { is_expected.to have_db_column(:locale).of_type(:string) }
    it { is_expected.to have_db_column(:gender).of_type(:integer) }
    it { is_expected.to have_db_column(:ssn).of_type(:string) }
    it { is_expected.to have_db_column(:discarded_at).of_type(:datetime) }
  end

  describe 'Table indexes' do
    it { is_expected.to have_db_index(:email) }
    it { is_expected.to have_db_index(:discarded_at) }
  end

  describe 'Model validations' do
    describe 'persisted record' do
      subject(:student) { described_class.new(lead: true) }

      it { is_expected.not_to validate_presence_of(:fname) }
      it { is_expected.not_to validate_presence_of(:lname) }
    end

    it { is_expected.to validate_presence_of(:fname) }
    it { is_expected.to validate_presence_of(:lname) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
  end

  describe 'Model relations' do
    it { is_expected.to belong_to(:active_student_target_language).optional }
    it { is_expected.to have_one(:active_target_language) }
    it { is_expected.to have_many(:target_languages) }
    it { is_expected.to have_many(:student_rewards) }
    it { is_expected.to have_many(:student_target_languages) }
    it { is_expected.to have_many(:team_students) }
    it { is_expected.to have_many(:comments) }
    it { is_expected.to have_many(:licenses).through(:team_students) }
    it { is_expected.to have_many(:plans).through(:active_licenses) }
  end

  describe '#locale with default fallback' do
    subject(:student_locale) { described_class.new(locale: locale).locale }

    context 'when valid' do
      let(:locale) { 'nb' }

      it { is_expected.to eq(locale) }
    end

    context 'when empty' do
      let(:locale) { '' }

      it { is_expected.to eq(I18n.default_locale.to_s) }
    end

    context 'when nil' do
      let(:locale) { nil }

      it { is_expected.to eq(I18n.default_locale.to_s) }
    end
  end

  describe '#locale as is' do
    subject(:student_locale) { described_class.new(locale: locale).locale(as_is: true) }

    context 'when valid' do
      let(:locale) { 'nb' }

      it { is_expected.to eq(locale) }
    end

    context 'when empty' do
      let(:locale) { '' }

      it { is_expected.to eq(locale) }
    end

    context 'when nil' do
      let(:locale) { nil }

      it { is_expected.to eq(locale) }
    end
  end

  describe '#be_email_valid' do
    it 'valid' do
      expect(described_class.new.be_email_valid('test@test.com')).to be_truthy
    end

    it 'invalid' do
      expect(described_class.new.be_email_valid('test@test,com')).to be_falsey
    end
  end

  describe '#earned_xp' do
    subject(:earned_xp) { student.earned_xp }

    before do
      gameplay
    end

    let(:student) { create(:student) }
    let(:gameplay) { create(:gameplay, student: student, xp_earned: 50) }

    it { is_expected.to eq(50) }
  end

  describe '#full_name' do
    let(:student) { create(:student, lead: true) }

    it 'returns full name' do
      student.update!(fname: Faker::Name.first_name, lname: Faker::Name.last_name)
      expect(student.full_name.downcase).to include(student.fname.downcase)
    end

    it 'returns empty string' do
      student.update!(fname: nil, lname: nil)
      expect(student.full_name).to be_blank
    end
  end
end
