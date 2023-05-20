# frozen_string_literal: true

json.items task.functional_items do |item|
  json.extract! item, :id, :type, :content
  json.translation item.translation(source: lesson.language_code, target: student&.native_language&.code)
  json.source_language lesson.language, :code, :name
  json.target_language do
    if (target_language = student&.native_language || student&.support_languages&.first)
      json.extract! target_language, :id, :code, :name
    else
      json.null!
    end
  end
  json.fallback_target_language_code I18n.locale.to_s
end
