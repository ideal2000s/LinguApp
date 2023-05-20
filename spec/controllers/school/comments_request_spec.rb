# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe CommentsController, type: :controller do
    before do
      allow(controller).to receive(:current_team).and_return(current_team)
      allow(controller).to receive(:current_user).and_return(current_user)
      allow(controller).to receive(:comment).and_return(comment)
      allow(CommentPolicy).to receive(:new).and_return(comment_policy)
      sign_in(current_user)
    end

    let(:current_user) { create(:user, :with_admin_role) }
    let(:current_team) { create(:team, owner: current_user, gdpr_consent_at: Time.zone.now) }
    let(:document) { create(:document, assignable: task, student: student) }
    let(:comment) { create :comment, commentable: document, author: current_user }
    let(:task) { create(:essay_task) }
    let(:task_item) { create(:essay_item, task: task) }
    let(:student) { create(:student) }
    let(:comment_policy) do
      instance_double(CommentPolicy, update?: true, add_comments?: true, document_content_update?: true)
    end

    describe 'post create' do
      before do
        post :create, params: { document_id: document.id, comment: params }, xhr: true
      end

      let(:params) do
        {
          content: 'document response update'
        }
      end

      it { is_expected.to respond_with(:ok) }
      it { is_expected.to render_template(:create) }
    end

    # describe 'POST add_comments' do
    #   before do
    #     post :add_comments, params: params, xhr: true
    #   end
    #
    #   let(:params) do
    #     {
    #       id: comment.id,
    #       word: 'comffort',
    #       comment: 'comfort',
    #       document_id: document.id
    #     }
    #   end
    #
    #   it { is_expected.to respond_with(:ok) }
    #   it { is_expected.to render_template(:add_comments) }
    # end
  end
end
