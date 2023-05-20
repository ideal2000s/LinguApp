# frozen_string_literal: true

module Tasks
  module Cases
    class FindSnapshot < Micro::Case::Strict
      attributes :task, :algorithm

      def call!
        if snapshot
          Failure(:ok) { { task: snapshot } }
        else
          Success(task: task, algorithm: algorithm)
        end
      end

      private

      def snapshot
        task.snapshot_record
      end
    end
  end
end
