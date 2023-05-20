# frozen_string_literal: true

require 'rails_helper'

RSpec.describe School::LicensePolicy do
  subject(:policy) { described_class }

  let(:user) { create(:team_user) }
  let(:record) { create(:license) }

  include_examples 'grant policy rule', :create?

  describe 'active license' do
    include_examples 'grant policy rule', :update?
    include_examples 'grant policy rule', :destroy?
  end

  describe 'revoked license' do
    before { record.revoke }

    include_examples 'reject policy rule', :update?
    include_examples 'reject policy rule', :destroy?
  end
end
