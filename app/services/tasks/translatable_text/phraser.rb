# frozen_string_literal: true

require 'html_to_plain_text'

module Tasks
  class TranslatableText::Phraser < PhraserBase
    private

    def phrases
      result = super

      task.items.each do |task_item|
        result << HtmlToPlainText.plain_text(task_item.content)
      end

      result
    end
  end
end
