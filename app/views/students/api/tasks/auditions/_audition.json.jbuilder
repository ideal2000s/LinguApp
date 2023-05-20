# frozen_string_literal: true

json.instruction task.instruction.to_s
json.items task.functional_items do |item|
  json.extract! item, :id, :type, :start, :start_string
  json.correct_word do
    json.body item.word.body
    json.word_class item.word.word_class
    json.image item.word.image_url
  end
  json.words item.similar_words.sample(10) do |word|
    json.body word.body
    json.word_class word.word_class
    json.image word.image_url
  end
end
