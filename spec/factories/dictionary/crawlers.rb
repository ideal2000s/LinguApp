# frozen_string_literal: true

# == Schema Information
#
# Table name: dictionary_crawlers
#
#  id            :bigint           not null, primary key
#  started_at    :datetime
#  finished_at   :datetime
#  job_uid       :string
#  language      :string           not null
#  url           :string           not null
#  file_name     :string
#  status        :integer
#  csv_file_data :json             not null
#  sub_domain    :jsonb            not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
FactoryBot.define do
  factory :dictionary_crawler, class: 'Dictionary::Crawler' do
    file_name { 'MyString' }
    language { 'MyString' }
    url { 'MyString' }
    status { '' }
    started_at { '' }
    finished_at { '' }
  end
end
