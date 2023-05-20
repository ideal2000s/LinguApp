# frozen_string_literal: true

module School
  class GdprAgreementsController < ApplicationController
    def show
      render :show, locals: { team: GlobalID::Locator.locate_signed(params[:team]),
                              processor_name: params[:processor_name] }, layout: false
    end
  end
end
