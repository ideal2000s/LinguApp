# frozen_string_literal: true

module Auth
  module Flows
    class OmniauthAuthenticate < Micro::Case::Safe
      flow Auth::Cases::UserFromOmniauth,
           Auth::Cases::CreateTeamInvitations,
           Teams::Cases::CreateDefault
    end
  end
end
