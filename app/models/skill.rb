# frozen_string_literal: true

# == Schema Information
#
# Table name: skills
#
#  id                :bigint           not null, primary key
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  name_translations :jsonb            not null
#

class Skill < ApplicationRecord
  has_many :lesson_skills, dependent: :destroy
  has_many :lessons, through: :lesson_skills

  translates :name
  validates :name, presence: true
end
