# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::Languages::CollectionsController, type: :controller do
  before { sign_in(current_user) }

  let(:current_user) { create(:user, :with_admin_role) }
  let(:language) { languages(:english) }
  let(:phrase1) { create(:dictionary_word, language: language) }
  let(:phrase2) { create(:dictionary_word, language: language) }
  let(:valid_attributes) do
    {
      name: 'color',
      level: 'a1',
      language_id: language.id,
      word_ids: [phrase1.id, phrase2.id]
    }
  end

  let(:invalid_attributes) do
    {
      name: '',
      level: 'a1',
      language_id: language.id,
      word_ids: [phrase1.id, phrase2.id]
    }
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      Dictionary::Collection.create!(valid_attributes)
      get :index, params: { language_id: language.id }
      expect(response).to be_successful
    end
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      collection = Dictionary::Collection.create!(valid_attributes)
      get :show, params: { language_id: language.id, id: collection.id }
      expect(response).to be_successful
    end
  end

  describe 'GET /new' do
    it 'renders a successful response' do
      get :new, params: { language_id: language.id }, xhr: true
      expect(response).to be_successful
    end
  end

  describe 'GET /edit' do
    it 'render a successful response' do
      collection = Dictionary::Collection.create!(valid_attributes)
      get :edit, params: { language_id: language.id, id: collection.id }
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Collection' do
        expect do
          post(:create, params: { language_id: language.id, dictionary_collection: valid_attributes }, xhr: true)
        end.to change(Dictionary::Collection, :count).by(1)
      end

      it 'redirects to the created collection' do
        post :create, params: { language_id: language.id, dictionary_collection: valid_attributes }, xhr: true
        expect(response).to be_successful
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Collection' do
        expect do
          post(:create, params: { language_id: language.id, dictionary_collection: invalid_attributes }, xhr: true)
        end.to change(Dictionary::Collection, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post :create, params: { language_id: language.id, dictionary_collection: invalid_attributes }, xhr: true
        expect(response).to be_successful
      end
    end
  end

  describe 'PATCH /update' do
    context 'with valid parameters' do
      let(:new_attributes) do
        {
          name: 'color_update',
          level: 'a2',
          language_id: language.id,
          phrase_ids: [phrase1.id, phrase2.id]
        }
      end

      it 'updates the requested collection' do
        collection = Dictionary::Collection.create!(valid_attributes)
        patch :update, params: { language_id: language.id, id: collection.id, dictionary_collection: new_attributes }
        collection.reload
        expect(collection.name).to eq(new_attributes[:name])
      end

      it 'redirects to the collection' do
        collection = Dictionary::Collection.create!(valid_attributes)
        patch :update, params: { language_id: language.id, id: collection.id, dictionary_collection: new_attributes }
        collection.reload
        expect(response).to redirect_to(admin_language_collections_url(language))
      end
    end

    context 'with invalid parameters' do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        collection = Dictionary::Collection.create!(valid_attributes)
        patch :update, params: { language_id: language.id, id: collection.id, dictionary_collection: invalid_attributes }
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested collection' do
      collection = Dictionary::Collection.create!(valid_attributes)
      expect do
        delete(:destroy, params: { language_id: language.id, id: collection.id })
      end.to change(Dictionary::Collection, :count).by(-1)
    end

    it 'redirects to the collections list' do
      collection = Dictionary::Collection.create!(valid_attributes)
      delete :destroy, params: { language_id: language.id, id: collection.id }
      expect(response).to redirect_to(admin_language_collections_url)
    end
  end
end
