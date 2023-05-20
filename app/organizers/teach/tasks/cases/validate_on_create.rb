# frozen_string_literal: true

module Teach
  module Tasks
    module Cases
      class ValidateOnCreate < Micro::Case::Strict
        attributes :params

        def call!
          if form.valid?
            Success(form: form)
          else
            Failure(:validation_error) { { form: form } }
          end
        end

        private

        def form
          @form ||= form_class.new(params)
        end

        def form_class
          ::Tasks::CreateForm
        end
      end
    end
  end
end
