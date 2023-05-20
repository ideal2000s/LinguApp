# frozen_string_literal: true

module School
  module CourseLessonTagHelper
    def lesson_tags_container(value, type)
      tags_container = tag.span(t("shared.#{type}"), class: 'text-500 mr-1')
      value.each { |e| tags_container << tag.span(e.titleize, class: "lesson-#{type}-tag mr-1") }
      tags_container
    end
  end
end
