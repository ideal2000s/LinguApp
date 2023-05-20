# Devise.with_options(model: 'otp/model', strategy: true, insert_at: 0) do |devise|
#   routes = [nil, :new, :create, :check]
#   devise.add_module :otp_authenticatable, controller: :otp, route: { otp: routes }
#   Devise::Mapping.add_module(:otp_authenticatable)
# end
#
# Warden::Strategies.add(:otp_authenticatable, Devise::Strategies::OtpAuthenticatable)
# class ActionDispatch::Routing
#   class Mapper
#     protected
#     def devise_otp(mapping, controllers) #:nodoc:
#       resource :otp, only: [], controller: controllers[:otp] do
#         get :new, as: "new"
#         post :create
#         put :check, as: "check"
#       end
#     end
#   end
# end
