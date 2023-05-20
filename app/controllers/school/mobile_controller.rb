# frozen_string_literal: true

module School
  class MobileController < ApplicationController
    skip_before_action :authenticate_user!

    layout 'school/blank'

    def index
      render :index
    end
  end
end
