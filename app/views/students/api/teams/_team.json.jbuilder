# frozen_string_literal: true

json.extract! team, :id, :followers_count, :name
json.brand team.image_url
