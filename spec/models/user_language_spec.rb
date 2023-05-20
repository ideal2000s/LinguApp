# frozen_string_literal: true

# == Schema Information
#
# Table name: user_languages
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  language_id :bigint           not null
#  level       :integer          default(0)
#  meta        :jsonb
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe UserLanguage, type: :model do
  describe 'Model relations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:language) }
  end
end
