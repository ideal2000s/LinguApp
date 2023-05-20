# frozen_string_literal: true

module School
  class CourseMailer < ApplicationMailer
    layout false

    def course_assigned_notification # rubocop:disable Metrics/MethodLength
      @course = params.fetch(:course)
      @student = params.fetch(:student)
      @team = params.fetch(:team)

      return unless @course

      I18n.with_locale(@student.native_locale.presence || 'en') do
        mail(
          to: "#{@student.full_name} <#{@student.email}>",
          from: 'Lingu <noreply@lingu.com>',
          bcc: 'Odd Bjerga <odd@lingu.com>',
          subject: t('course_mailer.course_assigned_notification.title', course: @course.title),
          template_id: 'd-23d32accfb214a9bace36051045a2cf8',
          dynamic_template_data: {
            title: t('course_mailer.course_assigned_notification.title', course: @course.title),
            school_name: @team.name,
            button_url_helper: t('course_mailer.course_assigned_notification.or_paste_this_link'),
            button_text: t('course_mailer.course_assigned_notification.button'),
            button_url: students_course_url(@course, subdomain: nil, host: ENV.fetch('MAIN_HOST', 'lingu.com')),
            footer_text: t('course_mailer.course_assigned_notification.footer_text'),
            notification_link: t('course_mailer.course_assigned_notification.notification_link'),
            support_link: t('course_mailer.course_assigned_notification.support_link')
          }
        )
      end
    end
  end
end
