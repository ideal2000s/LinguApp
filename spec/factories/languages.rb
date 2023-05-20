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
FactoryBot.define do
  factory :language do
    code { 'an' }
    system_name { 'English' }
    name_translations { '' }
    slug_translations { '' }
    active { 'f' }
    support { 'f' }
  end
end
