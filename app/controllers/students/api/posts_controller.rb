# frozen_string_literal: true

module Students::API
  class PostsController < ApplicationController
    def index
      render :index, locals: { posts: posts_scope }
    end

    def show
      render :show, locals: { post: post, lesson: post.lesson }
    end

    def comment
      comment = comment_scope.new(comment_params)
      if comment.save
        render json: { comment_content: comment.content }
      else
        render json: { error: 'Could not create the comment' }, status: :bad_request
      end
    end

    def like
      post_like = post_like_scope.new(student: current_student)
      if post_like.save
        render json: { success: true }
      else
        render json: { error: 'Could not subscribe' }, status: :bad_request
      end
    end

    private

    def posts_scope
      current_student.posts.kept
    end

    def post
      @post ||= posts_scope.find(params[:id])
    end

    def comment_scope
      post.comments
    end

    def post_like_scope
      post.post_likes
    end

    def comment_params
      params.require(:comment).permit(:content, :commentable_type, :commentable_id, :author_id, :author_type)
    end
  end
end
