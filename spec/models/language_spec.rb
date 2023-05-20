# frozen_string_literal: true

# == Schema Information
#
# Table name: languages
#
#  id                :bigint           not null, primary key
#  code              :string           not null
#  system_name       :string           not null
#  name_translations :jsonb            not null
#  slug_translations :jsonb            not null
#  active            :boolean          default(FALSE), not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  support           :boolean          default(FALSE), not null
#  words_count       :integer          default(0), not null
#  collections_count :integer          default(0), not null
#  characters        :string           default([]), not null, is an Array
#  restricted        :boolean          default(FALSE), not null
#  meta              :jsonb            not null
#
require 'rails_helper'

RSpec.describe Language, type: :model do
  context 'with Norwegian language' do
    subject(:language) { languages(:norwegian) }

    it 'is Norsk' do
      I18n.with_locale(:nb) do
        expect(language.name).to eq('Norsk')
      end
    end
  end

  context 'with German language' do
    subject(:language) { languages(:german) }

    it 'is German' do
      I18n.with_locale(:en) do
        expect(language.name).to eq('German')
      end
    end
  end

  describe 'Model relations' do
    it { is_expected.to have_many(:courses) }
    it { is_expected.to have_many(:lessons) }
    it { is_expected.to have_many(:rewards) }
    it { is_expected.to have_many(:students) }
    it { is_expected.to have_many(:student_target_languages) }
    it { is_expected.to have_many(:teams) }
    it { is_expected.to have_many(:team_groups) }
  end
end
