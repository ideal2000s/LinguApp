# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::LessonPolicy do
  subject(:policy) { described_class }

  let(:user) { team_user }
  let(:user_role) { :basic }
  let(:user_record) { create(:user, role: user_role) }
  let(:team_user_role) { :member }
  let(:team) { create(:team) }
  let(:team_user) { create(:team_user, user: user_record, role: team_user_role, team: team) }
  let(:record) { create(:lesson, team: team, author: author) }
  let(:author) { create(:user) }

  describe 'with member team user role' do
    include_examples 'grant policy rule', :index?
    include_examples 'grant policy rule', :show?
    include_examples 'grant policy rule', :new?
    include_examples 'grant policy rule', :create?
    include_examples 'grant policy rule', :reviewable?
    include_examples 'grant policy rule', :draft?

    context 'when own lesson' do
      let(:author) { user_record }

      include_examples 'grant policy rule', :edit?
      include_examples 'grant policy rule', :update?
      include_examples 'grant policy rule', :destroy?
    end

    context 'when not own lesson' do
      include_examples 'grant policy rule', :edit?
      include_examples 'grant policy rule', :update?
      include_examples 'reject policy rule', :destroy?
    end
  end

  describe 'with manager team user role' do
    let(:team_user_role) { :manager }

    include_examples 'grant policy rule', :index?
    include_examples 'grant policy rule', :show?
    include_examples 'grant policy rule', :new?
    include_examples 'grant policy rule', :create?
    include_examples 'grant policy rule', :reviewable?
    include_examples 'grant policy rule', :draft?

    context 'when own lesson' do
      let(:author) { user_record }

      include_examples 'grant policy rule', :edit?
      include_examples 'grant policy rule', :update?
      include_examples 'grant policy rule', :destroy?
    end

    context 'when not own lesson' do
      include_examples 'grant policy rule', :edit?
      include_examples 'grant policy rule', :update?
      include_examples 'grant policy rule', :destroy?
    end
  end

  describe 'with owner team user role' do
    let(:team_user_role) { :owner }

    include_examples 'grant policy rule', :index?
    include_examples 'grant policy rule', :show?
    include_examples 'grant policy rule', :new?
    include_examples 'grant policy rule', :create?
    include_examples 'grant policy rule', :reviewable?
    include_examples 'grant policy rule', :draft?

    context 'when own lesson' do
      let(:author) { user_record }

      include_examples 'grant policy rule', :edit?
      include_examples 'grant policy rule', :update?
      include_examples 'grant policy rule', :destroy?
    end

    context 'when not own lesson' do
      include_examples 'grant policy rule', :edit?
      include_examples 'grant policy rule', :update?
      include_examples 'grant policy rule', :destroy?
    end
  end

  describe 'with admin role' do
    let(:user_role) { :admin }

    include_examples 'grant policy rule', :index?
    include_examples 'grant policy rule', :show?
    include_examples 'grant policy rule', :new?
    include_examples 'grant policy rule', :create?
    include_examples 'grant policy rule', :reviewable?
    include_examples 'grant policy rule', :draft?

    context 'when own lesson' do
      let(:author) { user_record }

      include_examples 'grant policy rule', :edit?
      include_examples 'grant policy rule', :update?
      include_examples 'grant policy rule', :destroy?
    end

    context 'when not own lesson' do
      include_examples 'grant policy rule', :edit?
      include_examples 'grant policy rule', :update?
      include_examples 'reject policy rule', :destroy?
    end
  end
end
