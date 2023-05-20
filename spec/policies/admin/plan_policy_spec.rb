# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::PlanPolicy do
  subject(:policy) { described_class }

  permissions :index?, :new?, :create? do
    let(:record) { Plan }

    context 'when guest' do
      let(:user) { nil }

      it('denies access') { is_expected.not_to permit(user, record) }
    end

    context 'when basic user' do
      let(:user) { User.new(role: :basic) }

      it('denies access') { is_expected.not_to permit(user, record) }
    end

    context 'when admin' do
      let(:user) { User.new(role: :admin) }

      it('grants access') { is_expected.to permit(user, record) }
    end
  end
end
