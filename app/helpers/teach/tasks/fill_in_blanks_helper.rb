# frozen_string_literal: true

module Teach
  module Tasks
    module FillInBlanksHelper
      def parse_fill_blanks_statement(statement)
        result = ''
        result += statement.prepend('<div class="task-description" style="line-height: 50px">').concat('</div>')
        result.gsub(/\*([^*]*)\*/) do |s|
          "<span class='bg-soft-success font-weight-semi-bold bg-light border border-2x border-success rounded px-2 py-1'>
           #{s[1...-1].split(':').join(', ')}</span>"
        end
      end
    end
  end
end
