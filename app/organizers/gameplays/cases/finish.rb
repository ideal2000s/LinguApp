# frozen_string_literal: true

module Gameplays
  module Cases
    class Finish < Micro::Case::Safe
      attributes :form, :gameplay

      def call!
        return Failure(I18n.t('gameplays.errors.finish_params')) unless form.valid?
        return Success() if update_gameplay

        Failure(I18n.t('gameplays.errors.not_updated'))
      end

      private

      def update_gameplay
        gameplay.update(form.attributes)
      end
    end
  end
end
