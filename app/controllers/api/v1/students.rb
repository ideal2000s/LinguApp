# frozen_string_literal: true

module API
  module V1
    class Students < Grape::API
      resource :students do # rubocop:disable Metrics/BlockLength
        desc 'Get all students'
        get '', root: :students do
          students = students_scope.all
          present students, with: Entities::Student
        end

        desc 'Get a specific student'
        route_param :student_id do
          get do
            present student, with: Entities::Student
          end
        end

        desc 'Create a student'
        params do
          requires :student, type: Hash do
            requires :fname, type: String, desc: 'First name'
            requires :lname, type: String, desc: 'Last name'
            requires :email, type: String, desc: 'Email address'
            optional :mobile, type: String, desc: 'Mobile number'
            optional :locale, type: String, desc: 'Locale', default: 'nb'
            optional :gender, type: String, desc: 'Gender, 1: Male, 2: Female'
            optional :ssn, type: String, desc: 'Social security number'
          end
        end
        post do
          result =
            Flows::CreateStudent.call(params: params[:student])
          if result.success?
            present(result.value[:student], with: Entities::Student)
          else
            error!(result.value, :unprocessable_entity)
          end
        end

        desc 'Update a student'
        route_param :student_id do
          params do
            requires :student, type: Hash do
              optional :fname, type: String, desc: 'First name'
              optional :lname, type: String, desc: 'Last name'
              optional :email, type: String, desc: 'Email address'
              optional :mobile, type: String, desc: 'Mobile number'
              optional :locale, type: String, desc: 'Locale', default: 'nb'
              optional :gender, type: String, desc: 'Gender, 1: Male, 2: Female'
              optional :ssn, type: String, desc: 'Social security number'
            end
          end
          put do
            student.update!(params[:student])
            present student, with: Entities::Student
          end
        end

        desc 'Delete a student'
        route_param :student_id do
          delete do
            client_student.discard!
            status :no_content
          end
        end
      end

      helpers do
        def students_scope
          Student.all
        end

        def client_student
          @client_student ||=
            students_scope
            .kept
            .find_by!(student_id: params[:student_id])
        end

        def student
          @student ||= students_scope.kept.find(params[:student_id])
        end
      end
    end
  end
end
