# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::RankCalculator do
  pending 'Move ranking to lessons'
  # let(:default_attributes) do
  #   {
  #     performance: nil,
  #     type: 'Tasks::SelectImage',
  #     items: items,
  #     complexity: :low
  #   }
  # end
  # let(:a1) { :a1 }
  # let(:a2) { :a2 }
  # let(:items) { double(:items, count: 3) }
  # let(:level) { a1 }
  #
  # shared_examples 'Tasks::RankCalculator' do |higher = true|
  #   let(:result1) { described_class.new(task1).call }
  #   let(:result2) { described_class.new(task2).call }
  #
  #   it "expect task1 to be ordered #{higher && 'higher' || 'lower'} than task2" do
  #     comparison_method = :<
  #     comparison_method = :> if higher
  #     expect(result1).to(be.send(comparison_method, result2))
  #   end
  # end
  #
  # describe 'same type, same level, multiple items' do
  #   it_behaves_like('Tasks::RankCalculator', false) do
  #     let(:task1) { double(:task, default_attributes.merge(items: task1_items)) }
  #     let(:task2) { double(:task, default_attributes) }
  #     let(:task1_items) { double(:items, count: 2) }
  #   end
  # end
  #
  # describe 'same type, different level, same items' do
  #   it_behaves_like('Tasks::RankCalculator') do
  #     let(:task1) { double(:task, default_attributes.merge(level: a2)) }
  #     let(:task2) { double(:task, default_attributes) }
  #   end
  # end
  #
  # describe 'different type, same level, same items' do
  #   it_behaves_like('Tasks::RankCalculator', true) do
  #     let(:task1) { double(:task, default_attributes.merge(type: 'Tasks::SelectText')) }
  #     let(:task2) { double(:task, default_attributes.merge(type: 'Tasks::TrueFalse')) }
  #   end
  # end
end
