# frozen_string_literal: true

# == Schema Information
#
# Table name: dictionary_words
#
#  id             :bigint           not null, primary key
#  body           :string           not null
#  prefix         :string           default(""), not null
#  word_class     :integer          default("unknown"), not null
#  description    :string           default(""), not null
#  frequency      :bigint           default(0), not null
#  language_id    :bigint           not null
#  occurrences    :integer          default(0), not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  context        :jsonb            not null
#  translations   :jsonb
#  color_required :boolean          default(FALSE)
#
require 'rails_helper'

module Dictionary
  RSpec.describe Word, type: :model do
    describe 'Model validations' do
      it { is_expected.to validate_presence_of(:body) }
    end

    describe 'Model relations' do
      it { is_expected.to belong_to(:language) }
      it { is_expected.to have_many(:collections) }
    end
  end
end
