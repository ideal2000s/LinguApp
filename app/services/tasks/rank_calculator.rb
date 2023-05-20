# frozen_string_literal: true

module Tasks
  class RankCalculator
    DEFAULT_LEVEL_WEIGHT = 150
    DEFAULT_TASK_WEIGHT = 1

    LEVEL_WEIGHT_MAP = {
      'A1' => DEFAULT_LEVEL_WEIGHT,
      'A2' => 250 + DEFAULT_LEVEL_WEIGHT,
      'B1' => 320 + 250 + DEFAULT_LEVEL_WEIGHT,
      'B2' => 600 + 320 + 250 + DEFAULT_LEVEL_WEIGHT,
      'C1' => 800 + 600 + 320 + 250 + DEFAULT_LEVEL_WEIGHT,
      'C2' => 1000 + 800 + 600 + 320 + 250 + DEFAULT_LEVEL_WEIGHT
    }.freeze

    TASK_TYPE_WEIGHT_MAP = {
      'Tasks::TrueFalse' => 1.01,
      'Tasks::SelectText' => 1.02,
      'Tasks::SelectImage' => 1.03,
      'Tasks::ArrangeWords' => 1.05,
      'Tasks::MarkWords' => 1.05,
      'Tasks::FillInBlanks' => 1.05,
      'Tasks::InlineDropdown' => 1.04,
      'Tasks::Essay' => 1.5,
      'Tasks::Email' => 1.5,
      'Tasks::Audio' => 1.5,
      'Tasks::AudioDialogue' => 1.1,
      'Tasks::Sms' => 1.1
    }.freeze

    DEFAULT_COMPLEXITY_WEIGHT = 1.0
    COMPLEXITY_WEIGHT_MAP = {
      low: DEFAULT_COMPLEXITY_WEIGHT,
      medium: 1.1,
      high: 1.3
    }.freeze
    DEFAULT_PERFORMANCE = 70
    MAX_PERFORMANCE = 130

    def initialize(task)
      @task = task
    end

    def call
      complexity_weight * performance_weight * level_weight.to_i * task_weight
    end

    private

    attr_reader :task

    delegate :level, :complexity, to: :task, prefix: true

    def level_weight
      LEVEL_WEIGHT_MAP.fetch(level_short_name, DEFAULT_LEVEL_WEIGHT)
    end

    def level_short_name
      task.lesson.level
    end

    def complexity_weight
      COMPLEXITY_WEIGHT_MAP.fetch(task_complexity.to_sym, DEFAULT_COMPLEXITY_WEIGHT)
    end

    def performance_weight
      task.performance || DEFAULT_PERFORMANCE
    end

    def task_weight
      TASK_TYPE_WEIGHT_MAP.fetch(task.type, DEFAULT_TASK_WEIGHT)**task.items.count
    end
  end
end
