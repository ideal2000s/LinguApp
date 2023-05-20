# frozen_string_literal: true

module School
  class TeamUserFactory < BaseFactory
    USER_IMPORT_ATTRIBUTES = %w[fname lname email mobile].freeze

    attr_accessor :imported_users_count

    class << self
      def create_batch(current_team:, users_params:)
        new.create_batch(current_team: current_team, users_params: users_params)
      end
    end

    def create_batch(current_team:, users_params:)
      @imported_users_count = 0
      ActiveRecord::Base.transaction do
        users_params.each do |user_param|
          next unless ActiveModel::Type::Boolean.new.cast(user_param['valid'])

          import_user(user_param: user_param, current_team: current_team)
        end
      end
      { imported_users_count: @imported_users_count }
    rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved, ActiveRecord::RecordNotUnique
      { errors: [I18n.t('school.team_students.import_students.import_failed')] }
    end

    private

    def import_user(user_param:, current_team:) # rubocop:disable Metrics/MethodLength
      new_user_param = {}
      USER_IMPORT_ATTRIBUTES.each do |attribute|
        new_user_param[attribute] = user_param[attribute]
      end
      new_user_param['password'] = password_generator if new_user_param['password'].blank?
      new_user = User.where(email: new_user_param['email']).first
      new_user = User.create!(new_user_param) if new_user.blank?
      team_user = current_team.team_users.where(user_id: new_user.id).first
      current_team.team_users.create!(user_id: new_user.id, role: :member) if team_user.blank?

      save_user_languages(new_user: new_user, user_param: user_param)
      @imported_users_count += 1
    end

    def save_user_languages(new_user:, user_param:) # rubocop:disable Metrics/MethodLength, Metrics/CyclomaticComplexity
      return if user_param['language_data'].blank?

      languages = user_param['language_data'].split
      languages = user_param['language_data'].split(',') if languages.length < 2

      language_ids = []
      languages.each do |language_data|
        language_id = extract_language(language_data)
        language_ids.push(language_id) if language_id.present?
      end
      return if language_ids.blank?

      language_ids.each do |language_id|
        next if new_user.user_languages.exists?(language_id: language_id)

        UserLanguage.create!(user_id: new_user.id, language_id: language_id)
      end
    end
  end
end
