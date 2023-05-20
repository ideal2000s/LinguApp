# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::LessonPhrases::Cases::Extract do
  subject(:result) { described_class.call(lesson: lesson) }

  let(:lesson) { create(:lesson) }
  let(:tasks) do
    [
      create(:arrange_words_task, lesson: lesson, name: 'Arrange'),
      create(:audio_task, lesson: lesson, name: 'Audio'),
      create(:audio_dialogue_task, lesson: lesson, name: 'Dialogue'),
      create(:essay_task, lesson: lesson, name: 'Essay'),
      create(:fill_in_blanks_task, lesson: lesson, name: 'Blanks'),
      create(:inline_dropdown_task, lesson: lesson, name: 'Inline'),
      create(:mark_word_task, lesson: lesson, name: 'Mark'),
      create(:select_image_task, lesson: lesson, name: 'Image'),
      create(:select_text_task, lesson: lesson, name: 'Select'),
      create(:text_task, lesson: lesson, name: 'Text'),
      create(:true_false_task, lesson: lesson, name: 'True'),
      create(:video_task, lesson: lesson, name: 'Video')
    ]
  end

  before do
    tasks
  end

  it 'calls phraser adapters for tasks' do
    mocks = []
    %w[arrange_words fill_in_blanks inline_dropdown mark_word select_image select_text text true_false].each do |task_name|
      mock = double(:phraser, call: [])
      allow("Tasks::#{task_name.camelize}::Phraser".constantize).to receive(:new).and_return(mock)
      mocks << mock
    end

    result

    expect(mocks).to all(have_received(:call).once)
  end

  it 'combines results of all task phrasers' do
    expect(result.value).to eq(
      lesson: lesson,
      phrases: %w[arrange audio blanks dialogue essay image
                  inline introduction mark select task text true video]
    )
  end
end
