# frozen_string_literal: true

module School
  module CourseLessonCardAlignHelper
    def empty_lesson_cards(lessons_count)
      empty_count = [4 - lessons_count % 4, 3 - lessons_count % 3].max
      "<div class='section-lesson-card-item h-auto'></div>" * empty_count
    end
  end
end
