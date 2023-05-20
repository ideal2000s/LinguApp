# frozen_string_literal: true

module School
  class CommentPolicy < BasePolicy
    def update?
      role_from?(:member)
    end

    def add_comments?
      role_from?(:member)
    end

    def document_content_update?
      add_comments?
    end
  end
end
