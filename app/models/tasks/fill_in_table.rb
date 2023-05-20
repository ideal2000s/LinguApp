# frozen_string_literal: true

# == Schema Information
#
# Table name: tasks
#
#  id                 :bigint           not null, primary key
#  name               :string
#  type               :string           not null
#  introduction       :text
#  complexity         :integer          default("low")
#  performance        :float
#  ordered_solution   :boolean          default(FALSE)
#  discarded_at       :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  context            :jsonb            not null
#  published          :boolean          default(TRUE), not null
#  score_method       :integer          default("fractional"), not null
#  snapshot           :boolean          default(FALSE), not null
#  snapshot_timestamp :datetime
#  parent_id          :integer
#  subject            :integer          default("teach"), not null
#  rank               :integer          default(0)
#  lesson_id          :integer
#  position           :integer
#

module Tasks
  class FillInTable < ::Task
    MIN_ITEMS_SIZE = 3
    ANSWER_SCHEMA = [{ answers: [] }].freeze
    include BaseType
    include TaskTypedRelations

    AUDIO_QUESTION_FORMAT = 'audio'
    TEXT_QUESTION_FORMAT = 'text'

    has_many :items,
             -> { order(position: :asc) },
             class_name: 'TaskItems::FillInTable',
             foreign_key: :task_id,
             dependent: :destroy,
             inverse_of: :task

    store_accessor :context, :columns, :h1, :h2, :h3, :question_format,
                   :has_demo, :question_demo, :column1_demo, :column2_demo, :audio_question_demo_data, :video_url

    include Tasks::AudioUploader::Attachment(:audio_question_demo)

    def self.availability
      %w[test]
    end

    def two_columns?
      columns == 2
    end

    def audio_question_format?
      question_format == AUDIO_QUESTION_FORMAT
    end

    def acceptable?
      items.size >= MIN_ITEMS_SIZE
    end

    def self.answer_schema
      super + const_get(:ANSWER_SCHEMA)
    end
  end
end
