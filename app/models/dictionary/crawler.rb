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
module Dictionary
  class Crawler < ApplicationRecord
    self.table_name = :dictionary_crawlers

    validates :language, presence: true
    validates :url, presence: true

    include ::CSVUploader::Attachment(:csv_file)

    enum status: { pending: 0, running: 1, finished: 2 }
  end
end
