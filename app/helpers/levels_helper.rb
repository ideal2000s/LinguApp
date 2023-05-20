# frozen_string_literal: true

module LevelsHelper
  def lesson_kind_tag(lesson)
    tag.span(class: "mb-1 badge #{lesson_kind_label_class(lesson)}") do
      I18n.t(lesson.kind, scope: 'activerecord.attributes.lesson.short_kinds')
    end
  end

  def lesson_kind_label_class(lesson)
    case lesson.kind
    when 'tet'
      'badge-soft-primary'
    when 'storyline'
      'badge-soft-success'
    else
      'badge-success'
    end
  end

  def lesson_level_tag(lesson)
    tag.span(class: "mb-1 badge #{lesson_level_label_class(lesson)}") do
      I18n.t(lesson.level, scope: 'activerecord.attributes.lesson.short_levels')
    end
  end

  def lesson_level_label_class(lesson)
    case lesson.level
    when 'a1', 'a2', 'zero_level'
      'badge-soft-success'
    when 'b1', 'b2'
      'badge-soft-info'
    when 'c1', 'c2'
      'badge-soft-primary'
    else
      'badge-soft-warning'
    end
  end

  def level_tag(level)
    tag.span(class: "mb-1 badge #{level_label_class(level)}") do
      I18n.t(level, scope: 'activerecord.attributes.lesson.short_levels')
    end
  end

  def level_title(level)
    I18n.t(level, scope: 'activerecord.attributes.lesson.short_levels')
  end

  def level_label_class(level)
    case level
    when 'a1', 'a2', 'zero_level'
      'badge-soft-success'
    when 'b1', 'b2'
      'badge-soft-info'
    when 'c1', 'c2'
      'badge-soft-primary'
    else
      'badge-soft-warning'
    end
  end
end
