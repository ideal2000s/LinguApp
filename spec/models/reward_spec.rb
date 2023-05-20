# frozen_string_literal: true

# == Schema Information
#
# Table name: rewards
#
#  id           :bigint           not null, primary key
#  language_id  :bigint
#  name         :string           not null
#  description  :string
#  image_data   :text
#  kind         :integer          default("badge"), not null
#  dimension    :integer          default("word"), not null
#  value        :integer
#  discarded_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
require 'rails_helper'

RSpec.describe Reward, type: :model do
  describe 'Model relations' do
    it { is_expected.to belong_to(:language) }
    it { is_expected.to have_many(:student_rewards) }
  end

  describe 'Model validations' do
    subject do
      create(:reward)
    end

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:language) }
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:language_id) }

    describe 'validates image attribute' do
      let(:jpg_file) { File.open(fixture_file('image.jpg')) }
      let(:svg_file) { File.open(fixture_file('sample_svg.svg')) }

      it 'contains svg image' do
        badge_uploader = BadgeUploader.new(:store)
        uploaded_file = badge_uploader.upload(svg_file)
        reward = build(:reward, image: uploaded_file)
        expect(reward.save).to be_truthy
      end

      it 'does not contain jpg image' do
        badge_uploader = BadgeUploader.new(:store)
        uploaded_file = badge_uploader.upload(jpg_file)
        reward = build(:reward, image: uploaded_file)
        expect do
          reward.save!
        end.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
