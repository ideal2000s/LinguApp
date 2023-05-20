# frozen_string_literal: true

json.instruction task.instruction.to_s
json.image_url task.image_url
json.items task.functional_items do |item|
  json.extract! item, :id, :top, :left, :position
  # TODO: Consider optimizing queries
  json.incorrect_words item.task.lesson.phrases.where.not(id: item.word.id).order('random()').limit(5) do |word|
    json.extract! word, :body, :word_class
  end
  json.word do
    json.body item.word.body
    json.word_class item.word.word_class
  end
end
