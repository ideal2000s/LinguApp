# frozen_string_literal: true

ActionView::Base.field_error_proc = proc do |html_tag, _instance|
  html = ''
  form_fields = %w[textarea input select]
  tag_elements = Nokogiri::HTML::DocumentFragment.parse(html_tag).css('label, ' + form_fields.join(', '))

  tag_elements.each do |e|
    if e.node_name.eql?('label')
      html = e.to_s.html_safe # rubocop:disable Rails/OutputSafety
    elsif form_fields.include?(e.node_name)
      e['class'] = %(#{e['class']} is-invalid)
      html = e.to_s.html_safe # rubocop:disable Rails/OutputSafety
    end
  end

  html
end
