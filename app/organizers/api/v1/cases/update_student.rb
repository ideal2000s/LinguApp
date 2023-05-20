# frozen_string_literal: true

module API
  module V1
    module Cases
      class UpdateStudent < Micro::Case::Strict
        attributes :params, :student

        def call!
          student.update(params)

          Success(student: student)
        end
      end
    end
  end
end
