# frozen_string_literal: true

module Auth
  module Cases
    class UserFromOmniauth < Micro::Case::Strict
      attribute :oauth_hash

      def call!
        if (user = from_oauth!)
          User.current = user
          Success(user: user)
        else
          Failure('Could not create user')
        end
      rescue ActiveRecord::RecordInvalid
        Failure('Could not create user. Email exists in database already.')
      end

      private

      def from_oauth!
        find_user_by_identity || create_from_oauth
      end

      def create_from_oauth
        ActiveRecord::Base.transaction do
          @user = User.create!(email: email, fname: fname, lname: lname, password: pwd, role: default_role)
          @user.identities.create!(uid: uid, provider: provider)
        end
        @user if @user.persisted?
      end

      def find_user_by_identity
        User
          .joins(:identities)
          .find_by(identities: {
                     uid: uid,
                     provider: provider
                   })
      end

      def default_role
        :basic
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
    end
  end
end
