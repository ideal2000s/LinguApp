# frozen_string_literal: true

class TaskItems::Audition::Form < TaskItems::BasicForm
  MIN_START_INTERVAL_SECONDS = 5

  attribute :item, TaskItems::Audition
  attribute :task, Tasks::Audition
  attribute :start, Integer
  attribute :start_string, String, default: ->(form, _attr) { form.item&.start_string }
  attribute :word_id, Integer, default: ->(form, _attr) { form.item&.word&.id }
  validates :start, presence: true
  validate :task_audio_presence
  validate :task_audio_duration
  validate :start_interference

  def self.params_schema
    %i[start_string word_id]
  end

  def attributes(*args)
    super.except(:word_id).merge(task_item_word_attributes: { word_id: word_id })
  end

  def start
    hours, minutes, seconds = start_string.split(':')
    (hours.to_i * 3600) + (minutes.to_i * 60) + seconds.to_i
  end

  def start_string_max
    Time.at(task.audio_duration.to_i).utc.strftime('%H:%M:%S')
  end

  def task_audio_presence
    return if task.audio&.exists?

    errors.add(:start, I18n.t('teach.tasks.audition.errors.task_audio_presence'))
  end

  def task_audio_duration
    return if start <= task.audio_duration

    errors.add(:start, I18n.t('teach.tasks.audition.errors.task_audio_duration'))
  end

  def start_interference
    other_starts = task.items.select(&:persisted?).map(&:start).insert(0, 0)

    return unless other_starts.find { |other_start| (start - other_start).abs < MIN_START_INTERVAL_SECONDS }

    errors.add(
      :start,
      I18n.t('teach.tasks.audition.errors.start_interference', seconds: MIN_START_INTERVAL_SECONDS)
    )
  end
end
