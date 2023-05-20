# frozen_string_literal: true

module School
  module AvatarHelper
    def custom_profile_tag(user)
      if user.avatar
        image_tag(user.avatar_url, class: 'student-avatar')
      else
        tag.div(class: 'student-avatar-fallback d-flex align-items-center justify-content-center font-weight-bold') do
          user.initials
        end
      end
    end

    def social_icon_for(provider)
      return nil unless provider

      image_tag("logos/providers/#{provider}.svg")
    end
  end
end
