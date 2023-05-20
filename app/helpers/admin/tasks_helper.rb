# frozen_string_literal: true

module Admin
  module TasksHelper
    mattr_accessor :task_icons
    self.task_icons = {
      'Tasks::Audio' => 'fa-microphone-alt',
      'Tasks::Audition' => 'fa-headphones-alt',
      'Tasks::Dictation' => 'fa-keyboard',
      'Tasks::Essay' => 'fa-pencil-alt',
      'Tasks::Email' => 'fa-envelope-open',
      'Tasks::Embed' => 'fa-code',
      'Tasks::SelectText' => 'fa-tasks',
      'Tasks::MarkWord' => 'fa-paint-roller',
      'Tasks::MarkWordAudio' => 'fa-assistive-listening-systems',
      'Tasks::FillInBlanks' => 'fa-font',
      'Tasks::FillInTable' => 'fa-table',
      'Tasks::FillGap' => 'fa-eraser',
      'Tasks::InlineDropdown' => 'fa-caret-square-down',
      'Tasks::ImageHotspot' => 'fa-bullseye',
      'Tasks::ImageObject' => 'fa-object-ungroup',
      'Tasks::SelectImage' => 'fa-images',
      'Tasks::SelectVideo' => 'fa-tv',
      'Tasks::ArrangeWords' => 'fa-hand-point-up',
      'Tasks::AudioDialogue' => 'fa-comments',
      'Tasks::SMS' => 'fa-sms',
      'Tasks::Speaking' => 'fa-microphone-alt',
      'Tasks::TrueFalse' => 'fa-check',
      'Tasks::Video' => 'fa-play-circle',
      'Tasks::Text' => 'fa-file-alt',
      'Tasks::TranslatableText' => 'fa-language',
      'Tasks::Webpage' => 'fa-globe-americas',
      'Tasks::WordGames' => 'fa-gamepad'
    }.freeze

    def task_icon_class(task)
      task_icons.fetch(task.type, 'fa-question-circle')
    end

    def status_badge(status)
      tag.span(class: "badge #{status_class(status)}") do
        status.to_s
      end
    end

    def status_class(status)
      case status
      when 'active'
        'badge-soft-success'
      when 'canceled'
        'badge-soft-warning'
      else
        'badge-soft-info'
      end
    end
  end
end
