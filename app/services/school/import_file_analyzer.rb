# frozen_string_literal: true

require 'roo'
require 'roo-xls'

module School
  class ImportFileAnalyzer
    FNAME_ALIASES = ['first name', 'fname'].freeze
    LNAME_ALIASES = ['last name', 'lname', 'surname'].freeze
    EMAIL_ALIASES = ['email', 'e-mail', 'email address'].freeze
    MOBILE_ALIASES = %w[mobile phone cell].freeze
    GENDER_ALIASES = %w[gender sex].freeze
    NATIVE_LANGUAGE_ALIASES = ['native', 'native language'].freeze
    TARGET_LANGUAGE_ALIASES = ['target language', 'language'].freeze
    LANGUAGE_ALIASES = %w[language languages].freeze

    class << self
      def analyze(file_param:)
        new.analyze(file_param: file_param)
      end
    end

    def analyze(file_param:) # rubocop:disable Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/MethodLength
      spread_sheet = open_spread_sheet(file_param.path)
      imported_users = []
      headers = spread_sheet.row(1)
      spread_sheet.each_with_index do |row, idx|
        next if idx.zero?

        row_data = Hash[[headers, row].transpose]
        row_data = row_data.map { |key, value| [key.downcase, value] }
        row_data = extract_alias_attributes(row_data.to_h)
        user = OpenStruct.new(row_data)
        next if user.fname.blank? || user.lname.blank? || user.email.blank?

        user.full_name = "#{user.fname.titleize} #{user.lname.titleize}"
        user.email_valid = Student::EMAIL_REGEX.match(user.email).present?
        imported_users.push(user)
      end
      { original_file_name: file_param.original_filename, users: imported_users }
    rescue StandardError
      { errors: [I18n.t('school.team_students.import_students.analyze_failed')] }
    end

    private

    def open_spread_sheet(file_path)
      case File.extname(file_path)
      when '.xlsx' then Roo::Spreadsheet.open(file_path, extension: :xlsx)
      else Roo::Spreadsheet.open(file_path)
      end
    end

    def extract_alias_attributes(row_data) # rubocop:disable Metrics/AbcSize, Metrics/CyclomaticComplexity, Metrics/MethodLength, Metrics/PerceivedComplexity
      FNAME_ALIASES.each do |fname_alias|
        row_data['fname'] = row_data[fname_alias] if row_data[fname_alias].present?
      end
      LNAME_ALIASES.each do |lname_alias|
        row_data['lname'] = row_data[lname_alias] if row_data[lname_alias].present?
      end
      EMAIL_ALIASES.each do |email_alias|
        row_data['email'] = row_data[email_alias] if row_data[email_alias].present?
      end
      MOBILE_ALIASES.each do |mobile_alias|
        row_data['mobile'] = row_data[mobile_alias] if row_data[mobile_alias].present?
      end
      GENDER_ALIASES.each do |gender_alias|
        row_data['gender'] = row_data[gender_alias] if row_data[gender_alias].present?
      end
      NATIVE_LANGUAGE_ALIASES.each do |native_alias|
        row_data['native_language_data'] = row_data[native_alias] if row_data[native_alias].present?
      end
      TARGET_LANGUAGE_ALIASES.each do |target_alias|
        row_data['target_language_data'] = row_data[target_alias] if row_data[target_alias].present?
      end
      LANGUAGE_ALIASES.each do |language_alias|
        row_data['language_data'] = row_data[language_alias] if row_data[language_alias].present?
      end
      row_data
    end
  end
end
