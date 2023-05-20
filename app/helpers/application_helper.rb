# frozen_string_literal: true

module ApplicationHelper
  def score_label_tag(score)
    tag.span(class: "badge #{score_class(score)}") do
      score.to_s
    end
  end

  def score_class(score)
    case score
    when 100
      'badge-success'
    when 1...99
      'badge-warning'
    else
      'badge-danger'
    end
  end

  def word_class_tag(word)
    tag.span(class: "mb-1 badge #{word_class_label_class(word)}") do
      I18n.t(word.word_class, scope: 'activerecord.attributes.word.word_classes_abbr')
    end
  end

  def word_class_label_class(word)
    case word.word_class
    when 'other'
      'badge-soft-warning'
    else
      'badge-soft-success'
    end
  end

  def user_avatar(user, avatar_class = 'avatar-xl')
    tag.div(class: "avatar #{avatar_class}") do
      if user.avatar
        image_tag(user.avatar(:thumbnail).url, class: 'rounded-circle', alt: user.initials)
      else
        user_initials(user)
      end
    end
  end

  def user_initials(user)
    tag.div(class: 'avatar-name rounded-circle') do
      tag.span do
        user.initials
      end
    end
  end

  def user_avatar_with_name(user, avatar_class = 'avatar-xl')
    tag.div(class: 'media d-flex align-items-center') do
      user_avatar(user, avatar_class) +
        tag.div(class: 'media-body ml-2') do
          user.full_name
        end
    end
  end

  def humanize_seconds(seconds)
    return nil unless seconds

    ChronicDuration.output(seconds, format: :short, units: 2, limit_to_hours: true)
  end
end
