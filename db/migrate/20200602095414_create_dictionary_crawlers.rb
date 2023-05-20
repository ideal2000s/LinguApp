# frozen_string_literal: true

class CreateDictionaryCrawlers < ActiveRecord::Migration[6.0]
  def change
    create_table :dictionary_crawlers do |t|
      t.timestamp(:started_at)
      t.timestamp(:finished_at)
      t.string(:job_uid)
      t.string(:language, null: false)
      t.string(:url, null: false)
      t.string(:file_name)
      t.integer(:status)
      t.json :csv_file_data, null: false, default: {}
      t.jsonb(:sub_domain, null: false, default: {})

      t.timestamps
    end
  end
end
