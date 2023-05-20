# frozen_string_literal: true

module School
  class AssignmentsStats
    attr_accessor :documents, :team

    WEEKS_RANGE = (1..12).freeze

    class << self
      def stats(*args)
        new(*args).stats
      end
    end

    def initialize(documents, team)
      self.documents = documents
      self.team = team
    end

    def stats
      submission_hash = per_week_count_hash(count_hash)
      {
        documents_count: documents_count,
        reviewed_count: reviewed_count,
        avg_response_time: avg_response_time,
        submission_hash: submission_hash,
        documents_step: count_step(submission_hash),
        avg_rating: avg_rating
      }
    end

    private

    def documents_count
      documents.count
    end

    def reviewed_count
      documents.reviewed.count
    end

    def avg_response_time
      ChronicDuration.output(team.avg_response_time.to_i, format: :short, units: 1, limit_to_hours: true, keep_zero: true)
    end

    def avg_rating
      0
    end

    def comments_scope
      Comment.where(commentable_type: 'Document', commentable_id: documents.ids, created_at: 12.weeks.ago..1.day.ago)
    end

    def count_hash
      comments_scope.group("ceil(DATE_PART('day', comments.created_at-'#{12.weeks.ago}')/7)::integer")
                    .count('comments.created_at')
    end

    def per_week_count_hash(counts)
      WEEKS_RANGE.map { |e| [(WEEKS_RANGE.count + 1 - e).weeks.ago.strftime('%d %b'), counts.fetch(e, 0)] }.to_h
    end

    def count_step(submission_hash)
      submission_hash.values.max.fdiv(4).ceil
    end
  end
end
