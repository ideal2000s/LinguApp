# frozen_string_literal: true

module School
  module DocumentsHelper
    def document_status_tag(document)
      status = document.status
      if status == 'reviewed'
        tag.div(class: 'assignment-reviewed') do
          tag.i(class: 'fa fa-check mr-1') + I18n.t('school.assignments.reviewed')
        end
      else
        tag.div(class: 'assignment-pending d-flex align-items-center') do
          image_tag("icons/#{document.status}.svg", class: 'mr-1') + I18n.t('layouts.school.assignments.ready_for_review')
        end
      end
    end
  end
end
