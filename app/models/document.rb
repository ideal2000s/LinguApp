# frozen_string_literal: true

# == Schema Information
#
# Table name: documents
#
#  id                    :bigint           not null, primary key
#  task_item_id          :bigint
#  student_id            :bigint           not null
#  team_id               :bigint
#  content               :text
#  audio_data            :text
#  status                :integer          default("pending"), not null
#  context               :jsonb            not null
#  comments_count        :integer          default(0), not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  student_assignment_id :integer
#  assignable_type       :string           not null
#  assignable_id         :bigint           not null
#
class Document < ApplicationRecord
  AVAILABLE_ITEMS = %w[Tasks::Essay Tasks::Audio].freeze

  include ::AudioUploader::Attachment(:audio)

  belongs_to :assignable, polymorphic: true
  belongs_to :student
  belongs_to :team, optional: true

  has_many :comments, -> { order(:created_at) }, as: :commentable, inverse_of: :commentable, dependent: :destroy

  store_accessor :context, :comment_contents

  scope :status_include, (lambda do |statuses|
    where('status = ANY(ARRAY[?])', statuses.split(',').map { |e| Document.statuses.fetch(e) })
  end)

  scope :types_include, (lambda do |types|
    joins("INNER JOIN tasks on tasks.id = documents.assignable_id and documents.assignable_type='Task'")
        .where('tasks.type = ANY(ARRAY[?])', types.split(','))
  end)

  enum status: { pending: 0, reviewed: 1 }

  def self.ransackable_scopes(_auth_object = nil)
    %w[status_include types_include]
  end

  def response_time
    return 0 if comments.blank?

    comments.first.created_at - created_at
  end

  def self.with_response_time
    all
      .joins(:comments)
      .where(comments: { author_type: 'User' })
      .select(<<~SQL.squish)
        documents.*,
        (COALESCE(min(EXTRACT('seconds' from comments.created_at))::integer, NULL) - extract('seconds' from documents.
        created_at))::integer as response_time
      SQL
      .group(:id)
  end
end
