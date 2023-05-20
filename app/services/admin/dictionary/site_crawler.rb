# frozen_string_literal: true

require 'nokogiri'
require 'open-uri'
require 'html_to_plain_text'
require 'uri/http'
require 'spidr'

module Admin
  module Dictionary
    class SiteCrawler < Micro::Case
      attributes :crawler

      def call! # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
        Spidr.site(crawler.url.to_s) do |spider|
          spider.every_link { |url| page_links << url }
        end
        crawler.sub_domain = { urls: page_links.to_a }
        crawler.save!

        page_links.uniq.each do |link|
          response = Net::HTTP.get_response(URI(link))
          next unless response.is_a?(Net::HTTPSuccess)

          page_html = URI.parse(link).open.read
          html_lang = Nokogiri::HTML(page_html).css('html').attr('lang')
          if html_lang.to_s.downcase.include?(Language::LANGUAGE_ABBR[crawler.language]) || html_lang.nil?
            text_all << HtmlToPlainText.plain_text(page_html)
          end
        end
        Success(text_all)
      end

      private

      def page_links
        @page_links ||= Set.new
      end

      def text_all
        @text_all ||= String.new
      end
    end
  end
end
