# frozen_string_literal: true

# == Schema Information
#
# Table name: dictionary_imports
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  user_id    :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

module Dictionary
  RSpec.describe Import, type: :model do
    describe 'Model validations' do
      it { is_expected.to validate_presence_of(:name) }
    end

    describe 'Model relations' do
      it { is_expected.to belong_to(:user) }
      it { is_expected.to have_many(:words) }
      it { is_expected.to have_many(:import_words) }
    end
  end
end
