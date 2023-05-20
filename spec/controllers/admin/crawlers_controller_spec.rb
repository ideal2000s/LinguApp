# frozen_string_literal: true

require 'rails_helper'

# TODO: Implement stateful crawlers
RSpec.describe Admin::CrawlersController, type: :controller do
  let(:current_user) { create(:user, :with_admin_role) }
  let(:valid_attributes) do
    {
      file_name: '2020-05-11 10:03:15 UTC - translate.google.com',
      language: 'English',
      url: 'https://google.translate.com/',
      status: 'running',
      started_at: '2020-05-11 10:03:15 UTC',
      finished_at: '2020-05-11 10:04:22 UTC'
    }
  end
  let(:invalid_attributes) do
    {
      file_name: '2020-05-11 10:03:15 UTC - translate.google.com',
      language: '',
      url: '',
      status: 'running',
      started_at: '2020-05-11 10:03:15 UTC',
      finished_at: '2020-05-11 10:04:22 UTC'
    }
  end

  before { sign_in(current_user) }

  describe 'GET /index' do
    it 'renders a successful response' do
      Dictionary::Crawler.create!(valid_attributes)
      get :index
      expect(response).to be_successful
    end
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      crawler = Dictionary::Crawler.create!(valid_attributes)
      get :show, params: { id: crawler.id }
      expect(response).to be_successful
    end
  end

  describe 'GET /new' do
    it 'renders a successful response' do
      get :new
      expect(response).to be_successful
    end
  end

  describe 'GET /edit' do
    it 'render a successful response' do
      crawler = Dictionary::Crawler.create!(valid_attributes)
      get :edit, params: { id: crawler.id }
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      before do
        allow(Admin::Dictionary::CrawlWebsiteJob).to receive(:perform_later)
      end

      it 'creates a new Crawler' do
        expect do
          post(:create, params: { dictionary_crawler: valid_attributes })
        end.to change(Dictionary::Crawler, :count).by(1)
      end

      it 'redirects to the created crawler' do
        post :create, params: { dictionary_crawler: valid_attributes }
        expect(response).to redirect_to(admin_crawlers_url)
      end

      it 'runs crawler job' do
        post :create, params: { dictionary_crawler: valid_attributes }
        expect(Admin::Dictionary::CrawlWebsiteJob).to have_received(:perform_later)
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Crawler' do
        expect do
          post(:create, params: { dictionary_crawler: invalid_attributes })
        end.to change(Dictionary::Crawler, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post :create, params: { dictionary_crawler: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        {
          file_name: '2020-05-13 11:03:15 UTC - translate.google.com',
          language: 'English',
          url: 'https://google.translate.com/',
          status: 'running',
          started_at: '2020-05-13 11:03:15 UTC',
          finished_at: '2020-05-13 11:04:22 UTC'
        }
      end

      it 'updates the requested crawler' do
        crawler = Dictionary::Crawler.create!(valid_attributes)
        patch :update, params: { id: crawler.id, dictionary_crawler: new_attributes }
        crawler.reload
        expect(crawler.url).to eq(new_attributes[:url])
      end

      it 'redirects to the crawler' do
        crawler = Dictionary::Crawler.create!(valid_attributes)
        patch :update, params: { id: crawler.id, dictionary_crawler: new_attributes }
        crawler.reload
        expect(response).to redirect_to(admin_crawler_url(crawler))
      end
    end

    context 'with invalid parameters' do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        crawler = Dictionary::Crawler.create!(valid_attributes)
        patch :update, params: { id: crawler.id, dictionary_crawler: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested crawler' do
      crawler = Dictionary::Crawler.create!(valid_attributes)
      expect do
        delete(:destroy, params: { id: crawler.id })
      end.to change(Dictionary::Crawler, :count).by(-1)
    end

    it 'redirects to the crawlers list' do
      crawler = Dictionary::Crawler.create!(valid_attributes)
      delete :destroy, params: { id: crawler.id }
      expect(response).to redirect_to(admin_crawlers_url)
    end
  end
end
