# frozen_string_literal: true

FactoryBot.define do
  factory :mark_word_audio_item, parent: :task_item, class: 'TaskItems::MarkWordAudio' do
    statement { '' }
  end
end
