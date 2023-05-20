# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::Dictionary::Languages::WordsController, type: :controller do
  before { sign_in(current_user) }

  let(:current_user) { create(:user, :with_admin_role) }
  let(:language) { languages(:english) }
  let(:valid_attributes) do
    {
      prefix: 'a',
      body: 'goal',
      description: 'a pair of posts linked by a crossbar',
      frequency: 4,
      word_class: 'noun',
      language_id: language.id
    }
  end
  let(:invalid_attributes) do
    {
      prefix: 'a',
      body: '',
      description: 'a pair of posts linked by a crossbar',
      frequency: 4,
      word_class: 'noun',
      language_id: language.id
    }
  end

  describe 'GET /index' do
    it 'renders a successful response' do
      Dictionary::Word.create!(valid_attributes)
      get :index, params: { language_id: language.id }
      expect(response).to be_successful
    end
  end

  describe 'GET /show' do
    it 'renders a successful response' do
      phrase = Dictionary::Word.create!(valid_attributes)
      get :show, params: { language_id: language.id, id: phrase.id }
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
      phrase = Dictionary::Word.create!(valid_attributes)
      get :edit, params: { language_id: language.id, id: phrase.id }, xhr: true
      expect(response).to be_successful
    end
  end

  describe 'POST /create' do
    context 'with valid parameters' do
      it 'creates a new Phrase' do
        expect do
          post(:create, params: { language_id: language.id, dictionary_word: valid_attributes }, xhr: true)
        end.to change(Dictionary::Word, :count).by(1)
      end

      it 'redirects to the created phrase' do
        post :create, params: { language_id: language.id, dictionary_word: valid_attributes }, xhr: true
        expect(response).to be_successful
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new Phrase' do
        expect do
          post(:create, params: { language_id: language.id, dictionary_word: invalid_attributes }, xhr: true)
        end.to change(Dictionary::Word, :count).by(0)
      end

      it "renders a successful response (i.e. to display the 'new' template)" do
        post :create, params: { language_id: language.id, dictionary_word: invalid_attributes }, xhr: true
        expect(response).to be_successful
      end
    end
  end

  describe 'PATCH /update' do
    before do
      allow(Admin::Dictionary::WordFactory).to receive(:new).and_return(word_factory)
    end

    let(:word_factory) { instance_double(Admin::Dictionary::WordFactory) }

    context 'with valid parameters' do
      before do
        allow(word_factory).to receive(:update).and_return(true)
      end

      let(:phrase) { create(:dictionary_word, language: language) }

      it 'calls Admin::WordFactory' do
        patch :update, params: { language_id: language.id, id: phrase.id, dictionary_word: valid_attributes }
        expect(word_factory).to have_received(:update)
      end

      it 'redirects to the phrase' do
        patch :update, params: { language_id: language.id, id: phrase.id, dictionary_word: valid_attributes }
        phrase.reload
        expect(response).to redirect_to(admin_language_words_path(language))
      end
    end

    context 'with invalid parameters' do
      it "renders a successful response (i.e. to display the 'edit' template)" do
        allow(word_factory).to receive(:update).and_return(false)
        phrase = Dictionary::Word.create!(valid_attributes)
        patch :update, params: { language_id: language.id, id: phrase.id, dictionary_word: invalid_attributes }, xhr: true
        expect(response).to be_successful
      end
    end
  end

  describe 'DELETE /destroy' do
    it 'destroys the requested phrase' do
      phrase = Dictionary::Word.create!(valid_attributes)
      expect do
        delete(:destroy, params: { language_id: language.id, id: phrase.id })
      end.to change(Dictionary::Word, :count).by(-1)
    end

    it 'redirects to the phrases list' do
      phrase = Dictionary::Word.create!(valid_attributes)
      delete :destroy, params: { language_id: language.id, id: phrase.id }
      expect(response).to redirect_to(admin_language_words_path(language))
    end
  end

  describe 'DELETE /destroy_multiple' do
    it 'destroys the requested phrases' do
      phrase = Dictionary::Word.create!(valid_attributes)
      expect do
        delete(:destroy_multiple, params: { language_id: language.id, ids: phrase.id }, xhr: true)
      end.to change(Dictionary::Word, :count).by(-1)
    end
  end

  describe 'GET /csv_import' do
    it 'renders a successful response' do
      get :csv_import, params: { language_id: language.id }
      expect(response).to be_successful
    end
  end

  describe 'POST /csv_import' do
    it 'creates phrases and collections from csv' do
      expect do
        post(:csv_import_post, params: { language_id: language.id, file: fixture_file_upload('phrases.csv', 'text/csv') })
      end.to change(Dictionary::Word, :count).by(7)
                                             .and(change(Dictionary::Collection, :count).by(3))
    end
  end

  describe 'POST/text_import' do
    let(:tagger_result) { { 'phrases_hash' => { 'I' => 1, 'go' => 1 }, 'phrase_word_class' => { 'I' => 'PP', 'go' => 'VBP' } } }

    it 'creates phrases from text' do
      allow_any_instance_of(Admin::Dictionary::TreeTagger).to receive(:run_treetagger).and_return(tagger_result)
      expect do
        post(:text_import, params: { language_id: language.id, text: 'I go' })
      end.to change(Dictionary::Word, :count).by(2)
    end
  end

  describe 'GET /search' do
    it 'renders a successful response' do
      query = 'a'
      get :search, params: { language_id: language.id, q: query }, format: :json
      expect(response).to be_successful
    end
  end
end
