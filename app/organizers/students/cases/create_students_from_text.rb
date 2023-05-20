# frozen_string_literal: true

require 'csv'

module Students
  module Cases
    class CreateStudentsFromText < Micro::Case::Strict
      attribute :form

      def call!
        students = Student.create!(hash_array.reject { |h| duplicated_emails.include?(h[:email]) })

        Success(students: students + existing_students)
      end

      private

      def text
        form.students
      end

      def hash_array
        @hash_array ||= CSV.new(
          text,
          col_sep: "\t", headers: true, header_converters: :symbol, skip_blanks: true, converters: :all
        ).to_a.map(&:to_h).map do |student_hash|
          student_hash.merge(password: 'password')
        end
      end

      def existing_students
        @existing_students ||= Student.where(email: hash_array_emails).to_a
      end

      def duplicated_emails
        existing_students.pluck(:email)
      end

      def hash_array_emails
        hash_array.pluck(:email)
      end
    end
  end
end
