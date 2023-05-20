# frozen_string_literal: true

module Teach
  module Tasks
    module InlineDropdownHelper
      def parse_dropdown_statement(statement)
        result = ''
        statement.each_line do |s|
          result += s.prepend('<div class="task-description" style="line-height: 55px">').concat('</div>')
          result = result.gsub(/\*select:([^*]*)\*/) do |select_str|
            str = select_str.scan(/\*select:([^*]*)\*/)[0][0]
            "<div class='dropdown-select'><select class='inline-select'>#{options_from_str(str)}</select></div>"
          end
        end
        result
      end

      def options_from_str(str)
        result = ''
        str.split('/').each do |e|
          result += "<option>#{e}</option>"
        end
        result
      end
    end
  end
end
