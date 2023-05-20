# frozen_string_literal: true

module TeamInvitations
  module Flows
    class Accept < Micro::Case::Strict
      flow Cases::Accept,
           Teams::Cases::Join
    end
  end
end
