# frozen_string_literal: true

require 'public_suffix'
require 'csv'
require 'net/http'
require 'uri'

module Admin
  module Dictionary
    class CrawlWebsiteJob < ApplicationJob
      queue_as :low_priority

      def perform(crawler_id) # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
        crawler            = ::Dictionary::Crawler.find(crawler_id)
        crawler.started_at = Time.zone.now
        crawler.running!

        crawler_result = SiteCrawler.call(crawler: crawler)
        text_all       = crawler_result.value
        tagger_result = TreeTagger.call(text: text_all, language: crawler.language).value

        tmpfile = Tempfile.new(%W[#{PublicSuffix.parse(URI.parse(crawler.url.to_s).host)} .csv])
        CSV.open(tmpfile, 'wb') do |csv|
          csv << %w[phrase_body prefix word_class definition occurrences collection_title]
          tagger_result[:phrases_hash].each do |k, v|
            csv << [k.to_s, '', word_class_map(crawler)[tagger_result[:phrase_word_class][k].split('.')[0]] || 'other',
                    '', v.to_s, '']
          end
        end
        crawler.assign_attributes(finished_at: Time.zone.now, csv_file: tmpfile)
        crawler.finished!
      end

      private

      def word_class_map(crawler)
        new_hash = {}
        language_hash[crawler.language].each do |k, v|
          v.each do |e_v|
            new_hash[e_v] = k
          end
        end
        new_hash
      end

      def english_abbr
        {
          'conj' => %w[CC], 'n' => %w[CD NN NNS NP NPS], 'd' => %w[DT PDT RP WDT], 'prep' => %w[IN TO],
          'adj' => %w[JJ JJR JJS],
          'v' => %w[MD VB VBD VBG VBN VBZ VBP VD VDD VDG VDN VDZ VDP VH VHD VHG VHN VHZ VHP VV VVD VVG VVN VVZ VVP],
          'pron' => %w[PP PP$ WP VV$], 'adv' => %w[RB RBS WRB]
        }
      end

      def norwegian_abbr
        {
          'conj' => %w[CCONJ SCONJ], 'n' => %w[NOUN], 'd' => %w[DET], 'prep' => %w[ADP], 'adj' => %w[ADJ],
          'v' => %w[AUX VERB], 'pron' => %w[PRON], 'adv' => %w[ADV], 'other' => %w[INTJ PART]
        }
      end

      def language_hash
        {
          'english' => english_abbr,
          'norwegian' => norwegian_abbr
        }
      end
    end
  end
end
