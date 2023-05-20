# frozen_string_literal: true

module Gameplays
  module Cases
    class Create < Micro::Case::Strict
      attributes :student, :words

      def call!
        return Success(gameplay: gameplay, words: words) if gameplay.persisted?

        Failure(I18n.t('gameplays.errors.not_created'))
      end

      private

      def gameplay
        @gameplay ||= create_gameplay
      end

      def create_gameplay
        Gameplay.create(student: student, game_type: random_game_type)
      end

      def random_game_type
        Games.constants.sample
      end
    end
  end
end
