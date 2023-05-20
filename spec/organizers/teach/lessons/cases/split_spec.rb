# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Teach::Lessons::Cases::Split do
  subject(:result) { described_class.call(lesson: lesson, params: params) }

  let(:lesson) { create(:lesson) }
  let(:task_to_split) { create(:fill_in_blanks_task, lesson: lesson) }
  let(:other_task) { create(:email_task, lesson: lesson) }
  let(:params) { { title: 'new lesson title', task_ids: [task_to_split.id] } }

  context 'with success' do
    it { is_expected.to be_success }
    it { expect(lesson.reload.tasks).to eq([other_task]) }
    it { expect(result.value.title).to eq(params[:title]) }
    it { expect(result.value.tasks).to eq([task_to_split]) }
    it { expect(result.value.status).to eq('draft') }
  end

  context 'with failure' do
    before do
      allow(Lesson).to receive(:create).and_return(OpenStruct.new(persisted?: false))
    end

    it { is_expected.to be_failure }
  end
end
