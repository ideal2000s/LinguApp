# frozen_string_literal: true

module School
  class CommentsController < ApplicationController
    def create
      comment = comments_scope.where(commentable: document).new(comment_params)
      if comment.save
        document.reviewed!
        School::DocumentMailer.with(comment: comment).new_document_comment.deliver_later
        render :create, locals: { comment: comment, document: document }
      else
        render 'school/assignments/show', locals: { document: document, comment: comment }
      end
    end

    def add_comments
      comment.comments[params[:word]] = params[:comment]
      comment.save
      render :add_comments, locals: { word: params[:word], comment: params[:comment], document_id: params[:document_id] }
    end

    def document_content_update
      document.update(comment_contents: params[:content])
      render json: { success: true }
    end

    private

    def policy_class
      School::CommentPolicy
    end

    def authorize_action(record = Comment)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def comment
      @comment ||= Comment.find(params[:id])
    end

    def document
      @document ||= Document.find(params[:document_id])
    end

    def comments_scope
      current_user.comments
    end

    def comment_params
      params.require(:comment).permit(:content, :audio)
    end
  end
end
