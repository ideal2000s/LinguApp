# frozen_string_literal: true

require 'rails_helper'

RSpec.describe StudentWords::Cases::Play do
  subject(:result) { described_class.call(word: word, student: student, form: form) }

  let(:student) { create(:student) }
  let(:word) { create(:dictionary_word) }
  let(:form) { instance_double(StudentWords::PlayForm, valid?: form_valid, solved?: solved) }
  let(:form_valid) { true }
  let(:solved) { true }
  let(:student_word) { student.student_words.find_by(word: word) }

  context 'with no existing record' do
    it { is_expected.to be_success }

    context 'with solved' do
      before { result }

      it { expect(student_word.played_count).to eq(1) }
      it { expect(student_word.solved_count).to eq(1) }
      it { expect(student_word.last_failed_at).to be_blank }
    end

    context 'with unsolved' do
      let(:solved) { false }

      before { result }

      it { expect(student_word.played_count).to eq(1) }
      it { expect(student_word.solved_count).to eq(0) }
      it { expect(student_word.last_failed_at).to be_present }
    end

    context 'with invalid form' do
      let(:form_valid) { false }

      it { is_expected.to be_failure }
    end
  end

  context 'with existing record' do
    let(:student_word) { create(:student_word, student: student, word: word, played_count: 2, solved_count: 1) }

    before { student_word }

    it { is_expected.to be_success }

    context 'with solved' do
      before { result }

      it { expect(student_word.reload.played_count).to eq(3) }
      it { expect(student_word.reload.solved_count).to eq(2) }
    end

    context 'with unsolved' do
      let(:solved) { false }

      before { result }

      it { expect(student_word.reload.played_count).to eq(3) }
      it { expect(student_word.reload.solved_count).to eq(1) }
    end
  end
end
