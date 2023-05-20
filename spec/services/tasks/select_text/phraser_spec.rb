# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tasks::SelectText::Phraser, type: :service do
  subject(:service_call) { described_class.new(task).call }

  let(:task) { create(:select_text_task, name: 'Led Zeppelin', introduction: 'Sex, Drugs, Rocknroll') }
  let(:task_item) { create(:select_text_item, question: 'Music performer', task: task) }

  it 'fetches phrases from task' do
    task_item

    expect(service_call).to eq(%w[drugs led music performer rocknroll sex zeppelin])
  end
end
