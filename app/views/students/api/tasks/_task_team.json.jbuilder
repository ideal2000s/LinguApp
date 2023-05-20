# frozen_string_literal: true

json.extract! team, :id, :name, :about, :lessons_count, :followers_count
json.image_url team.image_url(:thumbnail)
