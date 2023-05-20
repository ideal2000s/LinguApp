# frozen_string_literal: true

# == Schema Information
#
# Table name: task_item_options
#
#  id           :bigint           not null, primary key
#  task_item_id :bigint
#  correct      :boolean
#  text_option  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  context      :jsonb            not null
#  type         :string
#

require 'rails_helper'

RSpec.describe TaskItemOption, type: :model do
  described_class.subclasses.each do |klass|
    it "#{klass.name} respond to .params_schema and #params_schema", aggregate_failures: true do
      expect(klass).to respond_to(:params_schema)
      expect(klass.new).to respond_to(:params_schema)
    end
  end
end
