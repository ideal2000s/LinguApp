# frozen_string_literal: true

class StaticController < Students::ApplicationController
  layout 'examination'

  skip_before_action :authenticate_student!

  def index; end
end
