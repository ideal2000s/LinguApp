# frozen_string_literal: true

require 'shell'

module Admin
  module Dictionary
    class TreeTagger < Micro::Case
      attributes :text, :language

      def call!
        tagger_result = run_treetagger
        Success(phrases_hash: tagger_result['phrases_hash'], phrase_word_class: tagger_result['phrase_word_class'])
      end

      def run_treetagger
        uri = URI.parse('https://tt.railsme.ninja/tagger')
        request = Net::HTTP::Post.new(uri)
        request.basic_auth('lingu', 'treeTagger')
        request.set_form_data(text: text, language: language)
        response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
          http.request(request)
        end
        JSON.parse(response.body)['result']
      end
    end
  end
end
