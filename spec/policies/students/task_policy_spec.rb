# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Students::TaskPolicy do
  subject(:policy) { described_class }

  # current_user
  let(:user) { create(:student) }

  describe 'language restricted' do
    let(:language) { create(:language, restricted: true) }
    let(:record) { create(:lesson, language: language) }

    include_examples 'reject policy rule', :show?

    describe 'student granted license' do
      let(:plan) { create(:plan, language: language) }
      let(:team) { create(:team) }
      let(:team_student) { create(:team_student, team: team, student: user) }
      let(:license) { License.new(plan: plan) }

      before { team_student.licenses << license }

      include_examples 'grant policy rule', :show?

      # describe 'expired' do
      # end
    end
  end

  describe 'language not restricted' do
    let(:language) { create(:language, restricted: false) }
    let(:record) { create(:lesson, language: language) }

    include_examples 'grant policy rule', :show?
  end
end
