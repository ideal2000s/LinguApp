class AddAudioDataToComments < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :audio_data, :text
  end
end
