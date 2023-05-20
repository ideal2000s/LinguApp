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
FactoryBot.define do
  factory :dictionary_import, class: 'Dictionary::Import' do
    source { 'MyString' }
  end
end
