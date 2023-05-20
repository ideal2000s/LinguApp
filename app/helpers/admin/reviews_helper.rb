# frozen_string_literal: true

module Admin
  module ReviewsHelper
    def lesson_status_tag(lesson)
      tag.span(class: "mr-2 badge #{lesson_status_label_class(lesson)}") do
        I18n.t(lesson.status, scope: 'activerecord.attributes.lesson.statuses')
      end
    end

    def lesson_status_label_class(lesson)
      status_map = {
        'draft': 'badge-soft-secondary',
        'pending': 'badge-soft-warning',
        'approved': 'badge-soft-success'
      }

      status_map[lesson.status]
    end

    def review_status_class(status)
      status_map = {
        'approved': 'fa-check color-green',
        'rejected': 'fa-minus-circle color-red'
      }
      status_map[status]
    end

    def done_class(status)
      status ? 'fa-check-circle color-green' : 'fa-times-circle color-red'
    end
  end
end
