# frozen_string_literal: true

require 'csv'

module Admin
  module Dictionary
    module Languages
      class WordsController < ApplicationController # rubocop:disable Metrics/ClassLength
        before_action :set_language
        before_action :set_word, only: %i[show edit update destroy edit_translation update_translation]

        def index # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
          @all_words = @language.words.order(occurrences: :desc).page(params[:page]).per(100)
          @search = @all_words.ransack(params[:q])
          @search_condition_count = params[:q].present? ? params[:q].values.filter(&:present?).count : 0
          @words = @search.result.includes(:collections)

          respond_to do |format|
            format.html
            format.csv do
              send_data(@words.except(:limit, :offset).to_csv,
                        filename: "words_export #{Time.now.getlocal.strftime('%F %H:%M:%S')}.csv")
            end
          end
        end

        def show; end

        def new
          @word = @language.words.build
          render :new, locals: { collection: collection }
        end

        def edit
          collection
          update_record = params[:record]
          form = if update_record.nil?
                   'form'
                 elsif update_record == 'audio'
                   'shared/audio_upload'
                 else
                   'shared/image_upload'
                 end
          render :edit, locals: { render_form: form }
        end

        def create
          @word             = ::Dictionary::Word.new(phrase_params)
          @word.occurrences = 1

          if @word.save
            create_success
          else
            create_failed
          end
        end

        def update
          remove_image_or_audio
          respond_to do |format|
            if Admin::Dictionary::WordFactory.update(phrase: @word, phrase_params: phrase_params)
              format.html { redirect_to create_update_path, notice: 'Word was successfully updated.' }
              format.js { render :update }
            else
              form = render_form(phrase_params)
              format.js { render :edit, locals: { render_form: form } }
            end
          end
        end

        def destroy
          @word.destroy
          respond_to do |format|
            format.html { redirect_to admin_language_words_path(@language), notice: 'Word was successfully destroyed.' }
            format.json { head :no_content }
          end
        end

        def destroy_multiple
          ::Dictionary::Word.where(id: params[:ids]&.split(',')).destroy_all
          respond_to do |format|
            format.js { render inline: 'location.reload();' } # rubocop:disable Rails/RenderInline
          end
        end

        def remove_from_collection
          ::Dictionary::WordCollection.where(dictionary_word_id: params[:ids]&.split(','),
                                             dictionary_collection_id: params[:collection_id]).destroy_all
          respond_to do |format|
            format.js { render inline: 'location.reload();' } # rubocop:disable Rails/RenderInline
          end
        end

        def csv_import; end

        def csv_import_post
          state = Struct.new(:collection_ids, :phrase_count).new(Set.new, 0)
          @error_messages = []
          @imported_words = []
          csv_parse(state)
          # FrequencyCalculatorJob.perform_later(@language)
          WordImportTracker.call(user: current_user, imported_words: @imported_words, source_type: 'csv')
          @message = "#{state.phrase_count} words and #{state.collection_ids.size} collections were imported."
          respond_to do |format|
            format.html { render :csv_import }
          end
        end

        def text_import # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
          if params[:text].length > 10_000
            WordsImporterJob.perform_later(text: params[:text], language: @language, user: current_user)
            @message = 'Words importer is running.'
          else
            tagger_result = TreeTagger.call(text: params[:text], language: @language.system_name.strip.downcase.split[0])
            phrases_hash = tagger_result.value[:phrases_hash]
            phrase_word_class = tagger_result.value[:phrase_word_class]

            import_result = WordImporter.call(language: @language, phrases_hash: phrases_hash,
                                              phrase_word_class: phrase_word_class, words_to_skip: [])
            WordImportTracker.call(user: current_user, imported_words: import_result.value[:words], source_type: 'text_import')

            @message = "#{import_result.value[:words_count]} words were imported."
          end
          respond_to do |format|
            format.html { render :csv_import }
          end
        end

        def recalculate_frequency
          FrequencyCalculatorJob.perform_later(@language)
          redirect_to(admin_language_words_path(@language), notice: t('.job_performing'))
        end

        def search
          words = @language.words.where('language_id = ? and body ILIKE ?', params[:language_id], "#{params[:q]}%")
          render :search, locals: { items: words }
        end

        def edit_translation; end

        def update_translation
          @word.translations[I18n.locale.to_s] = phrase_translation_params[:translation]
          @word.save!
        end

        def add_to_collection
          word_ids = params[:word_ids].split(',')
          render :add_to_collection, locals: { word_ids: word_ids, collections: @language.collections }
        end

        def add_to_collection_post
          params[:word_ids].each do |word_id|
            collection.word_collections.find_or_create_by(dictionary_word_id: word_id)
          end
          redirect_back(fallback_location: admin_language_collection_path(@language, collection),
                        notice: t('.add_to_collection_success', count: params[:word_ids].length, collection: collection.name))
        end

        private

        def remove_image_or_audio
          @word.image_data = nil if phrase_params[:remove_image] == true
          @word.audio_data = nil if phrase_params[:remove_audio] == true
        end

        def csv_parse(current_state) # rubocop:disable all
          CSV.foreach(params[:file].path, headers: true, header_converters: :symbol, col_sep: get_csv_col_sep(params[:file].path))
             .each_with_object(current_state) do |row, state|
            row_hash = row.to_hash
            if row_hash[:collection_title].blank?
              word = @language.words.find_or_initialize_by(phrase_attributes(row_hash).slice(:language, :body, :word_class))
              word_attribute_update(word, row_hash)
              @error_messages.concat(word.errors.full_messages) && next unless word.save!

            else
              row_hash[:collection_title].split(',').each do |title|
                collection = @language.collections.find_or_initialize_by(name: title)
                word = collection.words.find_or_initialize_by(phrase_attributes(row_hash).slice(:language, :body, :word_class))
                word_attribute_update(word, row_hash)
                word.save!
                @error_messages.concat(collection.errors.full_messages) && next unless collection.save!

                state.collection_ids << collection.id
              end
            end
            @imported_words << word
            state.phrase_count += 1
          end
        end

        def word_attribute_update(word, row_hash)
          word.attributes = phrase_attributes(row_hash).slice(:prefix, :description)
          word.occurrences += row_hash[:occurrences].nil? ? 1 : row_hash[:occurrences].to_i
        end

        def get_csv_col_sep(file_path)
          delimiters = %w["," ";"].freeze
          col_sep_hash = {}
          csv_first_line = File.open(file_path).first
          delimiters.each { |e| col_sep_hash[e] = csv_first_line.count(e) }
          col_sep_hash = col_sep_hash.sort { |a, b| b[1] <=> a[1] }
          col_sep_hash[0][0][1] if col_sep_hash.size.positive?
        end

        def phrase_attributes(row_hash)
          {
            language: @language,
            body: row_hash[:phrase_body],
            prefix: row_hash[:prefix] || '',
            word_class: ::Dictionary::Word::WORD_CLASS_ABBR[row_hash[:word_class]],
            description: row_hash[:definition] || ''
          }
        end

        def create_failed
          respond_to do |format|
            format.html { render :new }
            format.js { render :new }
          end
        end

        def create_success
          respond_to do |format|
            format.html { redirect_to create_update_path, notice: 'Word was successfully created.' }
            format.js { render js: "window.location.href='#{create_update_path}'" }
          end
        end

        def create_update_path
          if params.key?(:collection_id)
            admin_language_collection_path(@language, ::Dictionary::Collection.find(params[:collection_id]))
          else
            admin_language_words_path(@language)
          end
        end

        def render_form(params)
          if params.key?(:image)
            'shared/image_upload'
          elsif params.key?(:audio)
            'shared/audio_upload'
          else
            'form'
          end
        end

        def set_word
          @word = @language.words.find(params[:id])
        end

        def set_language
          @language = Language.find(params[:language_id])
        end

        def collection
          @collection = ::Dictionary::Collection.find(params[:collection_id]) if params[:collection_id]
        end

        def phrase_params
          params
            .require(:dictionary_word)
            .permit(:body, :prefix, :word_class, :description, :frequency, :language_id, :audio, :image,
                    :animation, :remove_image, :remove_audio, :remove_animation, :color_required, collection_ids: [])
        end

        def phrase_translation_params
          params.require(:dictionary_word).permit(:translation)
        end
      end
    end
  end
end
