# frozen_string_literal: true

class SummernoteUploadsController < ApplicationController
  def create
    @upload = SummernoteUpload.new(upload_params)
    @upload.save

    respond_to do |format|
      format.json { render json: { url: @upload.image.url, upload_id: @upload.id } }
    end
  end

  def destroy
    @upload = SummernoteUpload.find(params[:id])
    @upload.destroy

    respond_to do |format|
      format.json { render json: { status: :ok } }
    end
  end

  private

  def upload_params
    params.require(:summernote_upload).permit(:image)
  end
end
