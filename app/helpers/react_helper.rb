# frozen_string_literal: true

module ReactHelper
  def react_component(name, props = {}, options = {}, &block) # rubocop:disable Metrics/MethodLength
    options = { tag: options } if options.is_a?(Symbol)

    html_options = options.reverse_merge(data: {})
    html_options[:data].tap do |data|
      data[:react_class] = name
      data[:react_props] = (props.is_a?(String) ? props : props.to_json)

      rand_key = SecureRandom.hex(3) # @cache_ids.count { |c| c.start_with? name }
      data[:react_cache_id] = "#{name}-#{rand_key}"
    end
    html_tag = html_options.fetch(:tag, :div)

    # remove internally used properties so they aren't rendered to DOM
    html_options.except!(:tag)

    tag.send(html_tag, '', html_options, &block)
  end
end
