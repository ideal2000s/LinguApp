# frozen_string_literal: true

module Tasks
  module Cases
    class CreateSnapshot < Micro::Case::Strict
      attributes :task, :algorithm

      def call!
        if snapshot&.persisted?
          Success(task: snapshot)
        else
          Failure(:snapshot_builder_failure)
        end
      end

      private

      def snapshot
        @snapshot ||= Tasks::SnapshotBuilder.create!(task: task)
      end
    end
  end
end
