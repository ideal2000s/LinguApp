# frozen_string_literal: true

module Admin
  module Dictionary
    class WordImporter < Micro::Case
      attributes :language, :phrases_hash, :phrase_word_class, :words_to_skip

      def call!
        @words_count = 0
        @words = []
        new_hash = {}
        language_hash[language.system_name.strip.downcase.split[0]].each do |k, v|
          v.each { |e_v| new_hash[e_v] = k }
        end

        process_phrases!(new_hash)
        # FrequencyCalculatorJob.perform_later(language)
        Success(words_count: @words_count, words: @words)
      end

      private

      def process_phrases!(new_hash) # rubocop:disable Metrics/MethodLength
        phrases_hash.each do |k, v|
          next if new_hash[phrase_word_class[k].split('.')[0]] == 'skip'
          next if words_to_skip.present? && words_to_skip.include?(k)

          phrase_attributes  = { language: language, body: k,
                                 word_class: new_hash[word_class_hash(phrase_word_class)[k].split('.')[0]] || 'other' }
          word               = ::Dictionary::Word.find_or_initialize_by(phrase_attributes)
          word.occurrences += v
          word.save!
          @words << word
          @words_count += 1
        end
      end

      def word_class_hash(hash)
        return hash.transform_values! { |e| e.split(':')[0] } if language.code == 'da'
        return hash.transform_values! { |e| e[0] } if language.code == 'pt'

        hash
      end

      def english_abbr
        {
          'conjunction' => %w[CC], 'noun' => %w[CD NN NNS NP NPS], 'determiner' => %w[DT PDT RP WDT],
          'preposition' => %w[IN TO], 'adjective' => %w[JJ JJR JJS],
          'verb' => %w[MD VB VBD VBG VBN VBZ VBP VD VDD VDG VDN VDZ VDP VH VHD VHG VHN VHZ VHP VV VVD VVG VVN VVZ VVP],
          'pronoun' => %w[PP PP$ WP VV$], 'adverb' => %w[RB RBS WRB], 'interjection' => %w[UH]
        }
      end

      def norwegian_abbr
        {
          'conjunction' => %w[CCONJ SCONJ], 'noun' => %w[NOUN], 'determiner' => %w[DET], 'preposition' => %w[ADP],
          'adjective' => %w[ADJ], 'verb' => %w[AUX VERB], 'pronoun' => %w[PRON], 'adverb' => %w[ADV],
          'interjection' => %w[INTJ], 'other' => %w[PART], 'skip' => %w[PROPN]
        }
      end

      def french_abbr
        {
          'conjunction' => %w[KON], 'noun' => %w[NOM], 'determiner' => %w[DET:ART], 'preposition' => %w[PRP PRP:det],
          'adjective' => %w[ADJ],
          'verb' => %w[VER:cond VER:futu VER:impe VER:impf VER:infi VER:pper VER:ppre VER:pres VER:simp VER:subi VER:subp],
          'pronoun' => %w[DET:POS PRO PRO:DEM PRO:IND PRO:PER PRO:POS PRO:REL], 'adverb' => %w[ADV],
          'interjection' => %w[INT], 'other' => %w[ABR], 'skip' => %w[NAM]
        }
      end

      def spanish_abbr
        {
          'conjunction' => %w[CC CCAD	CCNEG	CQUE CSUBF CSUBI CSUBX], 'noun' => %w[NC NMEA	NMON NP	PERCT UMMX ACRNM],
          'determiner' => %w[ART], 'preposition' => %w[PREP PREP/DEL PAL PDEL], 'adjective' => %w[ADJ ORD QU],
          'verb' => %w[VCLIger VCLIinf VCLIfin VEadj VEfin VEger VEinf VHadj VHfin VHger VHinf VLadj VLfin VLger VLinf
                       VMadj VMfin VMger VMger VSadj VSfin VSger VSinf],
          'pronoun' => %w[DM INT PPC PPO PPX REL], 'adverb' => %w[ADV	NEG SE],
          'interjection' => %w[ITJN], 'skip' => %w[ALFS ALFP PE PNC]
        }
      end

      def german_abbr
        {
          'conjunction' => %w[KON KOKOM KOUS PTKREL], 'noun' => %w[NA NE NN], 'determiner' => %w[PDAT PIAT PPOSAT PWAT ART],
          'preposition' => %w[APPR APPRART APZR KOUI PTKA APPO PTKVZ PTKZU], 'adjective' => %w[ADJA ADJD TRUNC],
          'verb' => %w[VAFIN VMFIN VVFIN VVIMP VVINF VVPP VAIMP VAINF VAPP VMINF VMPP VVIZU],
          'pronoun' => %w[PDS PIS PPER PRF PPOSS PRELS PWS PWREL PRELAT],
          'adverb' => %w[ADV PAV PAVREL PROAV PWAT PWAVREL PTKNEG PWAV], 'interjection' => %w[ITJ PTKANT], 'other' => %w[FM]
        }
      end

      def portuguese_abbr
        {
          'conjunction' => %w[C], 'noun' => %w[N Z], 'determiner' => %w[D], 'preposition' => %w[S], 'adjective' => %w[A],
          'verb' => %w[V], 'pronoun' => %w[P], 'adverb' => %w[R], 'interjection' => %w[I], 'skip' => %w[F]
        }
      end

      def italian_abbr
        {
          'conjunction' => %w[CON], 'noun' => %w[NOM], 'determiner' => %w[DET:def DET:indef],
          'preposition' => %w[PRE	PRE:det], 'adjective' => %w[ADJ],
          'verb' => %w[VER:cimp	VER:cond VER:cpre VER:futu VER:geru VER:impe VER:impf	VER:infi VER:pper	VER:ppre VER:pres
                       VER:refl:infi	VER:remo],
          'pronoun' => %w[PRO	PRO:demo PRO:indef PRO:inter PRO:pers	PRO:poss PRO:refl	PRO:rela],
          'adverb' => %w[ADV], 'interjection' => %w[INT], 'other' => %w[ABR FW LS], 'skip' => %w[PON]
        }
      end

      def swedish_abbr
        {
          'conjunction' => %w[KN SN], 'noun' => %w[NN PM], 'determiner' => %w[DT HD], 'preposition' => %w[PP],
          'adjective' => %w[JJ], 'verb' => %w[VB PC], 'pronoun' => %w[HP PN PS HS], 'adverb' => %w[AB HA PL],
          'interjection' => %w[IN], 'other' => %w[UO], 'skip' => %w[IE]
        }
      end

      def danish_abbr
        {
          'conjunction' => %w[CC CS], 'noun' => %w[NC NP], 'determiner' => %w[], 'preposition' => %w[T-],
          'adjective' => %w[AC AD], 'verb' => %w[VI VF VM VG VP VT VD], 'pronoun' => %w[PC PM PI PO PP PR],
          'adverb' => %w[D-], 'interjection' => %w[I-], 'other' => %w[UO MN MV MA XF], 'skip' => %w[UI US XY]
        }
      end

      def language_hash # rubocop:disable Metrics/MethodLength
        {
          'english' => english_abbr,
          'norwegian' => norwegian_abbr,
          'french' => french_abbr,
          'spanish' => spanish_abbr,
          'german' => german_abbr,
          'portuguese' => portuguese_abbr,
          'italian' => italian_abbr,
          'swedish' => swedish_abbr,
          'danish' => danish_abbr
        }
      end
    end
  end
end
