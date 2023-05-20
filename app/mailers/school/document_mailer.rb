# frozen_string_literal: true

module School
  class DocumentMailer < ApplicationMailer
    layout false

    def new_document_comment # rubocop:disable Metrics/MethodLength,Metrics/AbcSize
      @comment = params.fetch(:comment)
      @author = @comment.author
      @team = @comment.commentable.team
      @student = @comment.commentable.student
      @essay = @comment.commentable.assignable
      @comment_url = 'https://lingu.com'
      I18n.with_locale(@student.native_locale.presence || 'en') do
        mail(
          to: "#{@student.full_name} <#{@student.email}>",
          from: "#{@author.full_name} <#{@author.email}>",
          bcc: 'Odd Bjerga <odd@lingu.com>',
          subject: t('course_mailer.new_document_comment.subject_line'),
          template_id: 'd-b3dcc180469643af90bb302a7617359d',
          dynamic_template_data: {
            subject_line: t('course_mailer.new_document_comment.subject_line'),
            author_url: @author.avatar_url(:thumbnail),
            author_text: t('course_mailer.new_document_comment.author_text', author: @author.full_name),
            assignment_title: @essay.name,
            comment: @comment.content,
            button_text: t('course_mailer.new_document_comment.button_text'),
            button_url_helper: t('course_mailer.new_document_comment.button_url_helper'),
            button_url: @comment_url,
            footer_text: t('course_mailer.new_document_comment.footer_text'),
            notification_link: t('course_mailer.new_document_comment.notification_link'),
            support_link: t('course_mailer.new_document_comment.support_link')
          }.tap do |h|
            h[:brand_url] = @team.image_url(:thumbnail) if @team&.image
          end.compact
        )
      end
    end
  end
end
