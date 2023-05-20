# frozen_string_literal: true

# == Schema Information
#
# Table name: dictionary_collections
#
#  id                    :bigint           not null, primary key
#  name                  :string           not null
#  level                 :integer
#  language_id           :bigint           not null
#  words_count           :bigint           default(0), not null
#  word_with_audio_count :bigint           default(0), not null
#  word_with_image_count :bigint           default(0), not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  tags                  :string           default([]), is an Array
#
require 'rails_helper'

module Dictionary
  RSpec.describe Collection, type: :model do
    describe 'Model validations' do
      it { is_expected.to validate_presence_of(:name) }
    end

    describe 'Model relations' do
      it { is_expected.to belong_to(:language) }
      it { is_expected.to have_many(:words) }
    end
  end
end
