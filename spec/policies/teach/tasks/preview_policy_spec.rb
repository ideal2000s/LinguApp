# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::Tasks::PreviewPolicy, type: :policy do
  subject(:policy) { described_class }

  let(:user) { team_user }
  let(:user_role) { :basic }
  let(:user_record) { create(:user) }
  let(:team_user_role) { :member }
  let(:team) { create(:team) }
  let(:team_user) { create(:team_user, user: user_record, role: team_user_role, team: team) }
  let(:record) { create(:select_text_task, lesson: lesson) }
  let(:lesson) { create(:lesson, team: team, author: author) }
  let(:author) { create(:user) }

  %i[basic manager owner].each do |role|
    describe "with #{role} team user role" do
      let(:team_user_role) { :member }

      include_examples 'grant policy rule', :show?

      # context 'when from another team' do
      #  # let(:team_user) { create(:team_user, user: user_record, role: team_user_role) }
      #
      # include_examples 'reject policy rule', :show?
      # end
    end
  end
end
