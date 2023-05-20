# frozen_string_literal: true

json.items results do |result|
  record = result.searchable
  json.id result.searchable_id
  json.text I18n.t('admin.search.search_result', type: result.searchable_type, result: record.search_result)
  json.url %w[Student User].include?(result.searchable_type) ? url_for([:edit, :admin, record]) : url_for([:admin, record])
end
