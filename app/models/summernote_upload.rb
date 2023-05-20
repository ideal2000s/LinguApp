# frozen_string_literal: true

# == Schema Information
#
# Table name: summernote_uploads
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  image_data :text
#
class SummernoteUpload < ApplicationRecord
  include ImageUploader::Attachment(:image)
end
