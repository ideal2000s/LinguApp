# frozen_string_literal: true

module APIHelpers
  def json
    JSON.parse(response.body, symbolize_names: true, object_class: OpenStruct)
  end

  %w[get post].each do |method|
    define_method("#{method}_with_expectation") do |*args, **options|
      expectation = args.last

      result = if options.any?
                 send(method, *args.slice(0..-2), **options)
               else
                 send(method, *args.slice(0..-2))
               end

      expect(response).to have_http_status(expectation)

      result
    end
  end

  def expected_status(status = :ok, &block)
    result = block.call
    expect(response).to have_http_status(status)
    result
  end

  def debug_response
    puts(JSON.pretty_generate(JSON.parse(response.body)))
  end

  def build_token_header(token = '')
    ActionController::HttpAuthentication::Token.encode_credentials(token)
  end
end
