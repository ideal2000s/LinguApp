# frozen_string_literal: true

module Tasks
  class SnapshotBuilder
    def self.create!(task:)
      new(task: task).create!
    end

    def initialize(task:)
      self.task = task
    end

    def create!
      ActiveRecord::Base.transaction do
        snapshot = build
        snapshot.snapshot = true
        snapshot.save!
        snapshot
      end
    end

    private

    attr_accessor :task

    def build
      for_each_association(task, :items) do |item, original|
        for_each_association(original, :options) do |opt|
          item.options << opt
        end
        kopy.items << item
      end
      kopy
    end

    def kopy
      return @kopy if @kopy

      @kopy = task.dup
      @kopy.introduction = task.introduction.dup
      @kopy.snapshot_timestamp = task.updated_at
      @kopy.parent_id = task.id
      @kopy
    end

    def for_each_association(from, association)
      return unless from.respond_to?(association)

      from.send(association).map do |item|
        snapshot = item.dup
        yield(snapshot, item) if block_given?
        snapshot
      end
    end
  end
end
