# frozen_string_literal: true

module Admin
  module TeamsHelper
    def default_team_status(value)
      return unless value

      tag.span do
        concat(tag.i('', class: 'fa fa-check color-green'))
        concat(tag.span(" #{t('teach.teams.index.default_team')}"))
      end
    end
  end
end
