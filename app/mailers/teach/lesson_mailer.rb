# frozen_string_literal: true

module Teach
  class LessonMailer < ApplicationMailer
    layout false

    def new_lesson_review # rubocop:disable Metrics/MethodLength
      @review = params.fetch(:review)
      @lesson = @review.lesson
      @user = @lesson.author
      I18n.with_locale(@user.locale.presence || I18n.default_locale) do
        mail(
          to: "#{@user.full_name} <#{@user.email}>",
          from: 'Lingu <noreply@lingu.com>',
          reply_to: "#{@review.author.full_name} <#{@review.author.email}>",
          bcc: 'Odd Bjerga <odd@lingu.com>',
          subject: @lesson.title,
          template_id: 'd-70abdaeebad443b483e8647943132b87',
          dynamic_template_data: {
            button: t('lesson_mailer.new_lesson_review.button'),
            button_url: teach_lesson_url(@lesson, host: 'teach.lingu.com'),
            preheader: t('lesson_mailer.new_lesson_review.preheader', user: @review.author.full_name),
            title: t('lesson_mailer.new_lesson_review.title')
          }
        )
      end
    end
  end
end
