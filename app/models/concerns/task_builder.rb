# frozen_string_literal: true

module TaskBuilder
  class Builder
    def initialize(task_klass, item_klass, option_klass = nil)
      self.task_klass = task_klass
      self.item_klass = item_klass
      self.option_klass = option_klass
    end

    def task_rules(&block)
      task_klass.class_eval(&block)
    end

    def task_item_rules(&block)
      item_klass.class_eval(&block)
    end

    def task_item_option_rules(&block)
      option_klass&.class_eval(&block)
    end

    private

    attr_accessor :task_klass, :item_klass, :option_klass
  end
end
