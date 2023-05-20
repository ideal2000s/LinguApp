# frozen_string_literal: true

module Teach
  class TeamDomainsController < ApplicationController
    def create
      authorize(TeamDomain, 'create?')
      result = TeamDomains::Cases::Create.call(team: team, domain: domain_params[:domain])

      respond_to do |format|
        format.js do
          render :create, locals: { team: team, team_domain: result.value, team_domains: team.team_domains }
        end
      end
    end

    def destroy
      authorize(team_domain, 'destroy?')
      team_domain.destroy

      respond_to do |format|
        format.js do
          render :destroy, locals: { team: team, team_domains: team.team_domains }
        end
      end
    end

    private

    def team
      team_scope.find(params[:team_id])
    end

    def team_scope
      policy_scope(current_user.teams, policy_scope_class: Teach::TeamPolicy::Scope)
    end

    def team_domain
      @team_domain ||= team.team_domains.find(params[:id])
    end

    def domain_params
      params.require(:team_domain).permit(:domain)
    end
  end
end
