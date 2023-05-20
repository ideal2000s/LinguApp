# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::NavigationPolicy do
  subject(:policy) { described_class }

  context 'when guest' do
    let(:user) { nil }

    include_examples 'reject policy rule', :users?
    include_examples 'reject policy rule', :settings?
  end

  context 'when basic' do
    let(:user) { User.new(role: :basic) }

    include_examples 'reject policy rule', :users?
    include_examples 'reject policy rule', :settings?
  end

  context 'when admin' do
    let(:user) { User.new(role: :admin) }

    include_examples 'grant policy rule', :users?
    include_examples 'grant policy rule', :settings?
  end
end
