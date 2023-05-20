# frozen_string_literal: true

# == Schema Information
#
# Table name: gameplays
#
#  id           :bigint           not null, primary key
#  student_id   :bigint           not null
#  game_type    :string
#  time_spent   :integer          default(0)
#  attempts     :integer          default(0)
#  completed_at :datetime
#  xp_earned    :integer          default(0)
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Gameplay < ApplicationRecord
  has_many :wordplays, dependent: :destroy, inverse_of: :gameplay

  belongs_to :student, inverse_of: :gameplays
end
