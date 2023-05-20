# frozen_string_literal: true

module Auth
  module Cases
    class StudentFromOmniauth < Micro::Case::Strict
      attributes :oauth_hash, :timezone

      def call!
        find_or_create_student

        return Failure(student: student) unless student.persisted?

        find_or_create_identity
        update_geo_info
        Success(student: student)
      end

      private

      attr_reader :student

      def find_or_create_student
        find_student_by_identity || find_student_without_identities || create_by_email
      end

      def find_student_by_identity
        @student = Student.joins(:student_identities).find_by(
          student_identities: {
            uid: uid,
            provider: provider
          }
        )
      end

      def find_student_without_identities
        @student =
          Student.left_joins(:student_identities)
                 .where(student_identities: { id: nil })
                 .find_by(email: email)
      end

      def create_by_email
        @student = Student.where(email: email).first_or_initialize

        return unless student.new_record?

        student.assign_attributes(fname: fname, lname: lname, password: pwd)
        assign_image
        student.save
      end

      def assign_image
        case image
        when String
          student.avatar_remote_url = image
        when StringIO
          student.avatar = image
        end
      end

      def find_or_create_identity
        student.student_identities.where(uid: uid, provider: provider).first_or_create
      end

      def update_geo_info
        student.update(time_zone: timezone)
      end

      def provider
        oauth_hash.fetch(:provider)
      end

      def uid
        oauth_hash.fetch(:uid)
      end

      def pwd
        SecureRandom.hex(8)
      end

      def lname
        oauth_hash.dig(:info, :last_name)
      end

      def fname
        oauth_hash.dig(:info, :first_name)
      end

      def email
        oauth_hash.dig(:info, :email)
      end

      def image
        oauth_hash.dig(:info, :image)
      end
    end
  end
end
