# frozen_string_literal: true

# == Schema Information
#
# Table name: task_items
#
#  id           :bigint           not null, primary key
#  task_id      :bigint
#  type         :string           not null
#  context      :jsonb            not null
#  discarded_at :datetime
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  position     :integer          default(0), not null
#  translations :jsonb
#

module TaskItems
  class SelectVideo < ::TaskItem
    has_many :options,
             -> { order(:id) },
             class_name: 'TaskItemOptions::SelectVideo',
             foreign_key: :task_item_id,
             inverse_of: :item,
             dependent: :destroy

    belongs_to :task,
               class_name: 'Tasks::SelectVideo',
               inverse_of: :items,
               touch: true

    store_accessor :context, :question, :video_data

    after_destroy :remove_video!
    acts_as_list scope: :task

    def functional?
      video && single_choice? && options.size >= 2
    end

    def video
      video_data
    end

    def video_url
      json = JSON.parse(video_data)
      location = json['location']
      stream_name = json['streamName']
      "https://#{location}/#{pipe_accounthash}/#{stream_name}.mp4"
    end

    def video_poster
      json = JSON.parse(video_data)
      location = json['location']
      stream_name = json['streamName']
      "https://#{location}/#{pipe_accounthash}/#{stream_name}.jpg"
    end

    def remove_video=(value)
      remove_video! if value
    end

    def remove_video!
      return unless video

      json = JSON.parse(video_data)
      video_id = json['videoId']

      uri = URI.parse("https://api.addpipe.com/video/#{video_id}")
      Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
        http.delete(uri.path, { 'X-PIPE-AUTH' => pipe_secret })
      end

      self.video_data = nil
    end

    def pipe_accounthash
      ENV.fetch('ADDPIPE_ACCOUNT')
    end

    def pipe_secret
      ENV.fetch('ADDPIPE_SECRET')
    end

    def pipe_eid
      ENV.fetch('ADDPIPE_EID')
    end

    private

    def single_choice?
      options.to_a.select(&:correct?).size == 1
    end
  end
end
