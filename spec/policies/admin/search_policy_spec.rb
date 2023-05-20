# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::SearchPolicy, type: :policy do
  subject(:policy) { described_class }

  let(:user) { User.new }

  permissions :index? do
    context 'when basic user' do
      let(:user) { User.new(role: :basic) }

      it('denies access') { is_expected.not_to permit(user) }
    end

    context 'when admin' do
      let(:user) { User.new(role: :admin) }

      it('grants access') { is_expected.to permit(user) }
    end
  end
end
