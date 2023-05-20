# frozen_string_literal: true

RSpec.shared_examples 'grant policy rule' do |action|
  let(:record) { nil } unless method_defined?(:record)

  permissions(action) do
    it 'grants access' do
      expect(policy).to permit(user, record)
    end
  end
end

RSpec.shared_examples 'reject policy rule' do |action|
  let(:record) { nil } unless method_defined?(:record)

  permissions(action) do
    it 'rejects access' do
      expect(policy).not_to permit(user, record)
    end
  end
end
