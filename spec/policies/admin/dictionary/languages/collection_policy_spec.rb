# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::Languages::CollectionPolicy do
  subject(:policy) { described_class }

  describe 'with guest role' do
    let(:user) { nil }

    include_examples 'reject policy rule', :index?
  end

  describe 'with basic role' do
    let(:user) { User.new(role: :basic) }

    include_examples 'reject policy rule', :index?
  end

  describe 'with admin role' do
    let(:user) { User.new(role: :admin) }

    include_examples 'grant policy rule', :index?
  end
end
