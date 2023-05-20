# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Add new inflection rules using the following format. Inflections
# are locale specific, and you may define rules for as many different
# locales as you wish. All of these examples are active by default:
# ActiveSupport::Inflector.inflections(:en) do |inflect|
#   inflect.plural /^(ox)$/i, '\1en'
#   inflect.singular /^(ox)en/i, '\1'
#   inflect.irregular 'person', 'people'
#   inflect.uncountable %w( fish sheep )
# end

# These inflection rules are supported but not enabled by default:
# ActiveSupport::Inflector.inflections(:en) do |inflect|
#   inflect.acronym 'RESTful'
# end

ActiveSupport::Inflector.inflections do |inflect|
  inflect.uncountable %w[
    arrange_words
    audio_dialogue
    audio
    video
    text
    translatable_text
    dashboard
    dictation
    embed
    essay
    fill_gap
    fill_in_blanks
    fill_in_table
    image_hotspot
    image_object
    inline_dropdown
    mark_word
    mark_word_audio
    select_image
    select_text
    select_video
    true_false
    sms
    speaking
    webpage
  ]
  inflect.acronym 'API'
  inflect.acronym 'OAuth'
  inflect.acronym 'CSV'
  inflect.acronym 'DB'
  inflect.acronym 'PDF'
  inflect.acronym 'SMS'
  inflect.acronym 'URL'
end
