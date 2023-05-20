# frozen_string_literal: true

require 'rails_helper'

RSpec.describe School::DashboardPolicy do
  subject(:policy) { described_class }

  permissions :index? do
    let(:record) { nil }

    context 'when member' do
      let(:team_user) { TeamUser.new(role: :member) }

      it('grants access') { is_expected.to permit(team_user, record) }
    end
  end
end
