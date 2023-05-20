# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Students::ResultPolicy do
  subject(:policy) { described_class }

  # current_user
  let(:user) { create(:student) }

  describe 'lesson session active' do
    let(:record) { create(:lesson_session, status: :active) }

    include_examples 'reject policy rule', :index?
  end

  describe 'lesson session canceled' do
    let(:record) { create(:lesson_session, status: :canceled) }

    include_examples 'reject policy rule', :index?
  end

  describe 'lesson session completed' do
    let(:record) { create(:lesson_session, status: :completed) }

    include_examples 'grant policy rule', :index?
  end
end
