# frozen_string_literal: true

json.extract! student_assignment,
              :assignment_id,
              :student_id,
              :deadline,
              :status,
              :passed_at,
              :created_at,
              :updated_at
