# frozen_string_literal: true

module School
  class StudentFactory < BaseFactory
    STUDENT_IMPORT_ATTRIBUTES = %w[fname lname email mobile gender ssn].freeze

    attr_accessor :imported_students_count, :student

    class << self
      def create_batch(**args)
        new(**args).create_batch
      end

      def create(**args)
        new(**args).create
      end
    end

    def initialize(current_team:, students_params:, team_group_id:, plan_id:, current_user: nil) # rubocop:disable Lint/MissingSuper
      self.current_user    = current_user
      self.current_team    = current_team
      self.students_params = students_params
      self.team_group_id   = team_group_id
      self.plan_id         = plan_id
    end

    def create
      if team_student?(students_params[:email])
        return { errors: [I18n.t('school.team_students.invite_students.already_student')] }
      end

      ActiveRecord::Base.transaction do
        @student = create_student(student_params: students_params)
      end
      { student: @student }
    rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved, ActiveRecord::RecordNotUnique
      { errors: [I18n.t('school.team_students.invite_students.create_student_failed')] }
    end

    def create_batch # rubocop:disable Metrics/MethodLength
      @imported_students_count = 0
      ActiveRecord::Base.transaction do
        students_params.each do |student_params|
          next unless ActiveModel::Type::Boolean.new.cast(student_params['valid'])

          create_student(student_params: student_params)
          @imported_students_count += 1
        end
        create_import_activity
      end
      { imported_students_count: @imported_students_count }
    rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved, ActiveRecord::RecordNotUnique
      { errors: [I18n.t('school.team_students.import_students.import_failed')] }
    end

    def create_import_activity
      current_team.create_activity(:group_import, owner: current_user, parameters: {
                                     plan: (Plan.find(plan_id)&.name if plan_id.present?),
                                     group: (TeamGroup.find(team_group_id)&.name if team_group_id.present?),
                                     students_count: imported_students_count
                                   })
    end

    private

    attr_accessor :current_user, :current_team, :students_params, :team_group_id, :plan_id

    def team_student?(email)
      current_team.team_students.joins(:student).exists?(students: { email: email })
    end

    def create_student(student_params:)
      student = find_or_create_student(student_params: student_params)
      student.undiscard if student.discarded_at
      team_student = current_team.team_students.all.find_or_create_by!(student_id: student.id)
      team_student.unarchive! if team_student.archived_at
      add_to_team_group(team_student) if team_group_id.present?
      License.create!(team_student_id: team_student.id, plan_id: plan_id) if licensable?(team_student)
      save_target_language(new_student: student, student_params: student_params)
    end

    def processed_params(student_params)
      new_student_param = STUDENT_IMPORT_ATTRIBUTES.index_with do |attribute|
        student_params[attribute]
      end
      new_student_param['password'] = password_generator if new_student_param['password'].blank?
      new_student_param['gender']   = 'unknown' unless Student.genders.keys.include?(new_student_param['gender'])
      new_student_param['ssn']      = '' if new_student_param['ssn'].blank?
      new_student_param
    end

    def find_or_create_student(student_params:)
      new_student_params = processed_params(student_params)
      new_student = Student.find_or_create_by(email: new_student_params['email'])
      new_student.update(new_student_params)
      new_student
    end

    def add_to_team_group(team_student)
      team_student.update!(team_group_id: team_group_id)
      team_student.create_activity(:group_assign, owner: current_user, recipient: team_student.student)
    end

    def save_target_language(new_student:, student_params:) # rubocop:disable Metrics/MethodLength
      return if student_params['target_language_data'].blank?

      target_language_id = extract_language(student_params['target_language_data'])
      return if target_language_id.blank?

      if student_params['level'].blank? || StudentTargetLanguage.levels.keys.exclude?(student_params['level'])
        student_params['level'] = 'undefined'
      end
      active_student_target_language = new_student.active_student_target_language
      return if active_student_target_language

      student_target_language = StudentTargetLanguage.create!(
        student_id: new_student.id, language_id: target_language_id, level: student_params['level']
      )
      new_student.update!(active_student_target_language: student_target_language)
    end

    def licensable?(team_student)
      plan_id.present? && team_student.active_license.blank?
    end
  end
end
