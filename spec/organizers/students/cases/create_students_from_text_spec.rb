# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Students::Cases::CreateStudentsFromText do
  describe '.call' do
    let(:student_data) do
      <<~EXCEL_DATA
        fname\tlname\temail\tmobile
        student A\tstudent A\tstudent1@test.com\t992 000 001
        student B\tstudent B\tstudent2@test.com\t992 000 002
      EXCEL_DATA
    end

    let(:form) { double(:form, students: student_data, client_id: 1, exam_id: 1, expires_at: 1.day.from_now) }

    context 'with valid rows' do
      it 'creates bulk Students from text' do
        expect { described_class.call(form: form) }.to change(Student, :count).by(2)
      end
    end

    context 'with duplicated emails' do
      before do
        create(:student, email: 'student1@test.com')
      end

      it 'skips duplicated emails' do
        expect { described_class.call(form: form) }.to change(Student, :count).by(1)
      end
    end
  end
end
