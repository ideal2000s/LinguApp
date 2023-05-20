# frozen_string_literal: true

module CustomFormBuilder
  class Base < ActionView::Helpers::FormBuilder
    class UploaderHelper
      attr_accessor :button_content, :preview_content, :remove_uploaded_content, :template, :resource

      def initialize(template:, resource:)
        self.template = template
        self.resource = resource
        self.button_content = I18n.t('upload')
      end

      def button(&block)
        self.button_content = template.capture(&block)
      end

      def preview(&block)
        self.preview_content = template.capture(resource, &block)
      end

      def remove_uploaded(&block)
        self.remove_uploaded_content = template.capture(resource, &block)
      end
    end

    def upload_helper_for(field,
                          resource: object,
                          button: {},
                          preview: {},
                          **args)
      helper = UploaderHelper.new(template: @template, resource: resource)
      yield(helper) if block_given?
      hidden_field(field, value: resource&.send("#{field}_data"), data: { upload_hidden: true })
        .concat(upload_file_field_tag(**args))
        .concat(upload_button_with_content(button, helper))
        .concat(@template.tag.div(nil, data: { upload_container: true }))
        .concat(preview_container_with_content(helper, preview))
        .concat(remove_uploaded_tag(helper, args[:remove_uploaded]))
        .concat(@template.error_for(resource, field))
    end

    private

    def preview_container_with_content(helper, preview)
      @template.tag.div(**preview.merge(data: { upload_preview_container: true },
                                        class: 'position-relative overflow-hidden d-inline-block')) do
        helper.preview_content
      end
    end

    def upload_button_with_content(button, helper)
      @template.button_tag(**button.merge(data: { upload_trigger: true })) do
        helper.button_content
      end
    end

    def upload_file_field_tag(**args)
      @template
        .file_field_tag(nil, **args.merge(class: 'upload-file'))
    end

    def remove_uploaded_tag(helper, remove_uploaded)
      return '' if remove_uploaded.blank?

      @template.tag.div(**remove_uploaded.merge(data: { upload_remove_trigger: true }, class: 'form-check')) do
        helper.remove_uploaded_content
      end
    end
  end
end
