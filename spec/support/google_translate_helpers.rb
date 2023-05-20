# frozen_string_literal: true

module GoogleTranslateHelpers
  def stub_google_translate(with: '')
    stub_request(:get, 'http://169.254.169.254')
    stub_request(:get, 'https://google.translate.com/')
    stub_request(:post, %r{language/translate/v2})
      .to_return(status: 200, body: google_translate_response(with: with))
  end

  def google_translate_response(with:)
    {
      'data' => {
        'translations' => [
          {
            'translatedText': with,
            'detectedSourceLanguage': 'en'
          }
        ]
      }
    }.to_json
  end
end
