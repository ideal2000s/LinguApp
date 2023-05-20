# frozen_string_literal: true

module Admin
  module Dictionary
    module Languages
      class CollectionsController < ApplicationController
        def index
          collections = language.collections.order(:level, :name)
          search      = collections.ransack(params[:q])
          collections = search.result
          render :index, locals: { search: search, collections: collections, language: language }
        end

        def show
          render :show, locals: { language: language, collection: collection }
        end

        def new
          collection = ::Dictionary::Collection.new(language_id: params[:language_id], word_ids: params[:word_ids]&.split(','))
          render :new, locals: { collection: collection }
        end

        def edit
          render :edit, locals: { collection: collection, language: language }
        end

        def create
          collection = ::Dictionary::Collection.new(collection_params)
          if collection.save
            create_success(collection)
          else
            create_failed(collection)
          end
        end

        def update
          return if add_word_by_search

          if collection.update(collection_params)
            update_success
          else
            update_failed
          end
        end

        def destroy
          collection.destroy
          redirect_to admin_language_collections_path(language), notice: 'Collection was successfully destroyed.'
        end

        def translate_words
          Admin::Dictionary::CollectionTranslatorJob.perform_now(collection: collection, target: I18n.locale.to_s)
          redirect_back(fallback_location: admin_language_collection_path(collection.language, collection))
        end

        private

        def update_failed
          respond_to do |format|
            format.any(:html, :js) { render :edit, locals: { collection: collection, language: language } }
          end
        end

        def update_success
          respond_to do |format|
            format.html { redirect_to admin_language_collections_path(language), notice: 'Collection was successfully updated.' }
            format.js { render js: "window.location.href='#{admin_language_collections_path(language)}'" }
            format.json { respond_with_bip(collection) }
          end
        end

        def create_success(collection)
          respond_to do |format|
            format.html { redirect_to admin_language_collections_path(language), notice: 'Collection was successfully created.' }
            format.js { render js: "window.location.href='#{admin_language_collection_path(language, collection)}'" }
          end
        end

        def create_failed(collection)
          respond_to do |format|
            format.any(:js, :html) { render :new, locals: { collection: collection, language: language } }
          end
        end

        def add_word_by_search
          result = false
          if params[:word_id]
            word = ::Dictionary::Word.find_by(language: language, id: params[:word_id])
            collection.words |= [word]
            render js: "window.location.href='#{admin_language_collection_path(language, collection)}'"
            result = true
          end
          result
        end

        def collection
          @collection ||= language.collections.find(params[:id])
        end

        def language
          @language ||= Language.find(params[:language_id])
        end

        def collection_params
          params.require(:dictionary_collection).permit(:name, :level, :language_id, tags: [], word_ids: [])
        end
      end
    end
  end
end
