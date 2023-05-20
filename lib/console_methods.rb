# frozen_string_literal: true

require 'deep_cloneable'

module Rails
  module ConsoleMethods
    # @return Course
    def clone_course(course_id:, author_id:, team_id:)
      Course.find(course_id).deep_clone(include: course_clone_associations) do |source, target|
        target.author_id = author_id if target.respond_to?(:author_id)
        target.team_id = team_id if target.respond_to?(:team_id)
        %i[image audio].each do |attachment_name|
          clone_attachment(attachment_name: attachment_name, to: target, from: source)
        end
      end
    end

    private

    def clone_attachment(attachment_name:, to:, from:)
      return unless from.respond_to?(attachment_name) &&
                    from.public_send(:"#{attachment_name}_attacher").stored?

      to.public_send(:"#{attachment_name}_data=", nil)
      source_attacher = from.public_send(:"#{attachment_name}_attacher")
      target_attacher = to.public_send(:"#{attachment_name}_attacher")
      target_attacher.attach(source_attacher.file)
      target_attacher.add_derivatives(source_attacher.derivatives)
    rescue Shrine::FileNotFound => e
      Rails.logger.info(e.message)
    end

    def course_clone_associations
      { course_sections: { lessons: { tasks: { items: :options } } } }
    end
  end
end
