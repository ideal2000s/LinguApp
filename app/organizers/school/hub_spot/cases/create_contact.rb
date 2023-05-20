# frozen_string_literal: true

module School
  module HubSpot
    module Cases
      class CreateContact < Base
        attributes :user

        def call!
          return Success(user: user) if user.hubspotid.present?

          create
          Success(user: user)
        end

        private

        def create
          result = api.create(properties: properties)
          user.update(hubspotid: result.id)
        end

        def api
          super
          @api ||= Hubspot::Crm::Contacts::BasicApi.new
        end

        def properties
          {
            firstname: user.fname,
            lastname: user.lname,
            email: user.email,
            phone: user.mobile
          }
        end
      end
    end
  end
end
