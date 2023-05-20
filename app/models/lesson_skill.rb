# frozen_string_literal: true

# == Schema Information
#
# Table name: lesson_skills
#
#  id        :bigint           not null, primary key
#  lesson_id :bigint
#  skill_id  :bigint
#
class LessonSkill < ApplicationRecord
  belongs_to :skill
  belongs_to :lesson
end
