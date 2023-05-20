# frozen_string_literal: true

json.items task.functional_items do |item|
  json.extract! item, :id, :type, :question, :audio_url, :position

  json.options item.options do |option|
    json.extract! option, :id
    json.answers option.split_answers
  end
end
json.extract! task, :columns, :has_demo, :question_demo, :column1_demo, :column2_demo, :h1, :h2, :h3,
              :question_format

json.audio_question_format task.audio_question_format?
json.audio_question_demo task.audio_question_demo_url if task.audio_question_demo
json.video_url task.video_url
