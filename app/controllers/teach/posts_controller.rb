# frozen_string_literal: true

module Teach
  class PostsController < ApplicationController
    before_action :authorize_action, except: %i[index new create]

    def index
      authorize_action(Post)

      render :index, locals: { posts: scope.page(params[:page]) }
    end

    def new
      post = scope.new
      authorize_action(post)

      render :new, locals: { post: post, lessons: lessons }
    end

    def create
      post = scope.new(post_params)
      authorize_action(post)

      if post.save
        redirect_to teach_posts_path, notice: t('teach.posts.create.success')
      else
        render :new, locals: { post: post, lessons: lessons }
      end
    end

    def edit
      render :edit, locals: { post: post, lessons: lessons }
    end

    def update
      if post.update(post_params)
        redirect_to teach_posts_path, notice: t('teach.posts.update.success')
      else
        render :edit, locals: { post: post, lessons: lessons }
      end
    end

    def destroy
      notice = if post.discard
                 I18n.t('teach.posts.destroy.success')
               else
                 I18n.t('teach.posts.destroy.failure')
               end
      redirect_to teach_posts_path, notice: notice
    end

    private

    def post
      @post ||= scope.find(params[:id])
    end

    def authorize_action(record = post)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Teach::PostPolicy
    end

    def scope
      policy_scope(Post, policy_scope_class: Teach::PostPolicy::Scope)
    end

    def lessons
      @lessons ||= Lesson.create_with(author: current_user).by_team(Team.current).kept.order(:title)
    end

    def post_params
      params.require(:post).permit(:content, :lesson_id)
    end
  end
end
