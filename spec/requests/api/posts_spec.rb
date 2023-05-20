# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Student posts API', type: :request do
  let(:student) { create(:student) }
  let(:user) { create(:user) }
  let(:team) { create(:team, owner: user) }
  let(:team_follower) { create(:team_follower, team: team, student: student) }
  let(:feed_post) { create(:post, team: team, author: user) }
  let(:comment) do
    create(:comment, commentable_type: 'Post', commentable_id: feed_post.id, author_id: student.id, author_type: 'Student')
  end

  describe 'get posts' do
    subject(:posts_request) { get '/api/feed/posts' }

    context 'when user is authenticated' do
      before do
        sign_in(student, scope: :student)
        team_follower
        feed_post
        comment
        posts_request
      end

      specify 'it returns student feed' do
        expect(response.status).to eq(200)
      end

      specify 'it returns feed' do
        expect_res = OpenStruct.new(id: feed_post.id, content: feed_post.content, lesson_id: nil, comments_count: 1,
                                    likes_count: 0, created_at: feed_post.created_at.iso8601,
                                    author: OpenStruct.new(full_name: user.full_name, avatar_url: nil))
        expect(json.posts).to eq([expect_res])
      end
    end

    context 'when not authenticated' do
      before { posts_request }

      specify 'it returns error' do
        expect(response.status).to eq(401)
      end
    end
  end

  describe 'show post' do
    subject(:post_request) { get "/api/feed/posts/#{feed_post.id}" }

    context 'when not authenticated' do
      before { post_request }

      specify 'it returns error' do
        expect(response.status).to eq(401)
      end
    end

    context 'when user is authenticated' do
      before do
        sign_in(student, scope: :student)
        team_follower
        comment
        post_request
      end

      specify 'it returns feed post' do
        expect(response.status).to eq(200)
      end

      specify 'it returns post' do
        expect(json.post).to have_attributes(
          id: feed_post.id,
          content: feed_post.content,
          lesson_id: nil,
          comments_count: 1,
          likes_count: 0
        )
      end
    end
  end

  describe 'creates comment' do
    subject(:comment_request) { post "/api/feed/posts/#{feed_post.id}/comment", params: params }

    let(:params) do
      {
        comment: {
          content: 'comment content',
          commentable_type: 'Student',
          commentable_id: student.id,
          author_type: 'User',
          author_id: user.id
        }
      }
    end

    context 'when not authenticated' do
      before { comment_request }

      specify 'it returns error' do
        expect(response.status).to eq(401)
      end
    end

    context 'when user is authenticated' do
      before do
        sign_in(student, scope: :student)
        team_follower
      end

      specify 'it returns success' do
        comment_request
        expect(response.status).to eq(200)
      end

      specify 'it creates comment' do
        expect { comment_request }.to change(Comment, :count).by(1)
      end

      specify 'it returns comment content' do
        comment_request
        expect(json).to have_attributes(comment_content: 'comment content')
      end
    end
  end

  describe 'creates post_like' do
    subject(:like_request) { post "/api/feed/posts/#{feed_post.id}/like" }

    context 'when not authenticated' do
      before { like_request }

      specify 'it returns error' do
        expect(response.status).to eq(401)
      end
    end

    context 'when user is authenticated' do
      before do
        sign_in(student, scope: :student)
        team_follower
      end

      specify 'it returns success' do
        like_request
        expect(response.status).to eq(200)
      end

      specify 'it creates post_like' do
        expect { like_request }.to change(PostLike, :count).by(1)
      end
    end
  end
end
