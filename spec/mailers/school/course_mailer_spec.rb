# frozen_string_literal: true

require 'rails_helper'

RSpec.describe School::CourseMailer, type: :mailer do
  let(:team) { create(:team) }
  let(:course) { create(:course, team: team) }
  let(:team_group) { create(:team_group, team: team, course: course) }
  let(:student) { create(:student) }
  let(:team_student) { create(:team_student, team: team, team_group: team_group, student: student) }

  describe '#course_assigned_notification' do
    subject(:mail) { described_class.with(team: team, student: student, course: course).course_assigned_notification }

    before { team_student }

    it 'renders headers', aggregate_failures: true do
      expect(mail.subject).to eq(
        I18n.t('course_mailer.course_assigned_notification.title', course: course.title, locale: student.locale)
      )
      expect(mail.to).to eq([student.email])
    end
  end
end
