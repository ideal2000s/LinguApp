# frozen_string_literal: true

json.instruction task.instruction.to_s
json.items task.functional_items do |item|
  json.extract! item, :id, :type, :position
  json.statement item.prepared_statement
  json.words item.task_item_words do |item_word|
    json.body item_word.word.body
    json.word_translation item_word.word.translation(target: task.locale)
    json.word_class item_word.word.word_class
    json.image_url item_word.word.image_url
    json.audio_url item_word.word.audio&.url
    json.animation_url item_word.word.animation&.url
    json.color_required item_word.word.color_required
  end
end
