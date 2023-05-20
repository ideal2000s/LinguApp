# frozen_string_literal: true

require 'rails_helper'

RSpec.describe School::AssignmentPolicy do
  subject(:policy) { described_class }

  permissions :index? do
    let(:record) { nil }

    context 'when member' do
      let(:team_user) { TeamUser.new(role: :member) }

      it('grants access') { is_expected.to permit(team_user, record) }
    end
  end

  permissions :show? do
    let(:record) { create(:document, assignable: task, student: student) }
    let(:task) { create(:essay_task) }
    let(:task_item) { create(:essay_item, task: task) }
    let(:student) { create(:student) }

    context 'when member' do
      let(:team_user) { TeamUser.new(role: :member) }

      it('grants access') { is_expected.to permit(team_user, record) }
    end
  end
end
