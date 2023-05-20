# frozen_string_literal: true

module API
  module V1
    module Cases
      class FindOrCreateStudent < Micro::Case::Strict
        attributes :params

        def call!
          student = Student
                    .create_with(params)
                    .find_or_create_by!(email: params[:email])
          Success(student: student)
        end
      end
    end
  end
end
