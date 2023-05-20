# frozen_string_literal: true

module API
  module V1
    module Entities
      class Student < Grape::Entity
        root 'students', 'student'

        expose :id
        expose :fname
        expose :lname
        expose :email
        expose :gender
        expose :ssn
        expose :locale
        expose :mobile
      end
    end
  end
end
