module PunditHelper
  extend ActiveSupport::Concern
end

ApplicationController.send :include, PunditHelper
