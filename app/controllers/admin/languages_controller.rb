# frozen_string_literal: true

module Admin
  class LanguagesController < ApplicationController
    def index
      authorize_action
      render :index, locals: { languages: scope.active.order(:code).page(params[:page]) }
    end

    def inactive
      authorize_action
      render :inactive, locals: { languages: scope.inactive.order(:code) }
    end

    def edit
      authorize_action(language)
      render :edit, locals: { language: language }
    end

    def update
      authorize_action(language)
      if language.update(language_params)
        redirect_to admin_languages_path,
                    notice: "Language #{helpers.link_to(language.system_name, edit_admin_language_path(language))} was updated"
      else
        render :edit, locals: { language: language }, status: :unprocessable_entity
      end
    end

    def add_character
      language.characters << params.dig(:language, :character)
      language.save

      render :add_character, locals: { characters: language.characters, language: language }
    end

    def remove_character
      index = params[:index]
      return head :no_content if index.to_i.to_s != index

      language.characters.delete_at(index.to_i)
      language.save
      render :remove_character, locals: { characters: language.characters, language: language }
    end

    private

    def language
      @language ||= scope.find(params[:id])
    end

    def authorize_action(record = Language)
      authorize(record, "#{action_name}?", policy_class: policy_class)
    end

    def policy_class
      Admin::LanguagePolicy
    end

    def scope
      policy_scope(Language, policy_scope_class: Admin::LanguagePolicy::Scope)
    end

    def language_params
      params.require(:language).permit(:active, :support, :characters, :translation_note, *name_fields, *slug_fields)
    end

    def name_fields
      I18n.available_locales.map { |locale| "name_#{locale}".to_sym }
    end

    def slug_fields
      I18n.available_locales.map { |locale| "slug_#{locale}".to_sym }
    end
  end
end
