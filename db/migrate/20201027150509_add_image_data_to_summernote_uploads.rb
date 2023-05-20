class AddImageDataToSummernoteUploads < ActiveRecord::Migration[6.0]
  def change
    add_column :summernote_uploads, :image_data, :text
  end
end
