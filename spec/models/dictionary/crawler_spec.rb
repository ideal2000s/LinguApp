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
require 'rails_helper'

module Dictionary
  RSpec.describe Crawler, type: :model do
    describe 'Model validations' do
      it { is_expected.to validate_presence_of(:language) }
      it { is_expected.to validate_presence_of(:url) }
    end
  end
end
