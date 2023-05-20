# frozen_string_literal: true

if language
  json.support_language language, :id, :name, :code
else
  json.support_language nil
end
