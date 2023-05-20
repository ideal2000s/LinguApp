# frozen_string_literal: true

require 'sidekiq/web'
require 'sidekiq/cron/web'
require 'subdomain_constraint'
require 'user_role_constraint'

Sidekiq::Web.app_url = '/'

Rails.application.routes.draw do
  mount API::Base => '/'
  mount GrapeSwaggerRails::Engine => '/documentation'

  get '/auth/google_user/callback', to: 'omniauth#create'
  get '/auth/*_student/callback', to: 'students/omniauth#create'
  scope constraints: SubdomainConstraint.new('admin', 'teach', 'school') do
    devise_for :users,
               controllers: { registrations: 'registrations', sessions: 'sessions' },
               path_names: { registration: 'register' }
  end
  mount Shrine.upload_endpoint(:cache) => '/upload', as: :upload

  scope constraints: SubdomainConstraint.new('teach') do
    scope module: :teach do
      get '/', to: 'lessons#index'
    end
    namespace :teach, path: '' do
      get '/dashboard', to: 'lessons#index', as: :dashboard
      resources :lessons do
        collection do
          get :draft
          get :pending
          get :approved
          get :published
          get :reviewable
          get :search
        end
        member do
          get :review
          post :publish
          post :status
          post :unpublish

          # TODO: move next 2 methods to separate controller
          post :add_objective
          post :set_color
          delete :remove_objective

          resource :lesson_split, only: [:new, :create]
          resource :task_move, only: [:new, :create]
        end
        resources :tasks do
          member do
            patch :position
            patch :toggle_published
            delete :delete_file_attachment
            get :convert_text_task_type, as: 'convert_type'
          end
        end
        resources :phrases, only: %i[index create destroy] do
          collection do
            post :generate
            delete :destroy_batch
          end
        end
        resources :reviews, only: %i[index create destroy]
      end

      resources :tasks do
        resources :items, only: %i[index create destroy update] do
          resources :words, only: %i[index create destroy]

          member do
            patch :move_up
            patch :move_down
          end
        end
      end
      scope module: :tasks, path: 'tasks/:task_id', as: :task do
        resource :preview, only: :show
      end

      resources :items, only: [] do
        resources :options, only: %i[create update destroy] do
          put :toggle_correct, on: :member
        end
      end

      resource :current_team, only: :create
      resources :teams, only: %i[new create edit update destroy] do
        member do
          post :default
          get :followers
          get :instruction
          post 'instruction' => 'teams#instruction_post'
        end

        resources :team_users, path: 'members', only: %i[index update destroy] do
          member do
            delete :leave
          end
        end

        resources :team_domains, only: %i[create destroy]
      end

      resources :posts
      resources :courses do
        get :words, on: :member
        resources :course_sections, as: :sections, only: %i[create update destroy] do
          member do
            post :add_lesson
            get :remove_lesson
            patch :move_up
            get :move_up_lesson
            get :move_down_lesson
          end
        end
      end
    end
  end
  resource :profile, only: %i[show update] do
    patch :update_password
    get :incomplete
  end

  scope constraints: SubdomainConstraint.new('admin') do
    authenticate :user, lambda { |u| u.admin? } do
      mount Sidekiq::Web => '/sidekiq'
    end
    scope module: :admin do
      get '/', to: 'dashboard#index'
    end
    namespace :admin, path: '' do
      scope constraints: UserRoleConstraint.new(:admin, :editor) do
        resources :dashboard, only: :index
        resources :lessons, only: %i[index edit update show]
        resources :courses, only: %i[index show] do
          member do
            get :words
            get :level_words
            put :translate_words
          end

          collection do
            get :reset_phrases_count
          end
        end
        resources :skills, only: %i[index create show update]
        resources :teams, except: :destroy
        resources :users
        resources :students
        resources :rewards
        resources :crawlers
        resources :search, only: :index
        resources :languages, only: [:index, :edit, :update] do
          get :inactive, on: :collection
          post :add_character, on: :member
          delete :remove_character, on: :member
          scope module: 'dictionary/languages' do
            resources :words do
              collection do
                delete :destroy_multiple
                get :remove_from_collection
                get :csv_import
                post 'csv_import' => 'words#csv_import_post'
                post :text_import
                post :recalculate_frequency
                get :search
                get :add_to_collection
                post 'add_to_collection' => 'words#add_to_collection_post'
              end

              member do
                get :edit_translation
                put :update_translation
              end
            end
            resources :collections do
              put :translate_words, on: :member
            end
          end
        end
        resources :teams do
          scope module: 'teams' do
            scope module: 'oauth', path: '' do
              resources :apps, path: 'oauth_apps', only: [:index, :show, :update, :destroy], as: :oauth_apps do
                put :regenerate_key, on: :member
              end
            end
          end

          member do
            post :signin_school
          end
        end
        resources :plans
      end
      match '/*any', via: :all, to: redirect(subdomain: 'teach', path: '/')
    end
  end
  resource :profile, only: %i[show update] do
    patch :update_password
  end

  scope constraints: SubdomainConstraint.new('school') do
    scope module: :school do
      get '/', to: 'dashboard#index'
    end

    namespace :school, path: '' do
      get '/dashboard', to: 'dashboard#index', as: :dashboard
      resource :gdpr_agreement, only: :show
      resource :dashboard, only: :index do
        collection do
          post :agreement
        end
      end
      resource :current_team, only: [:create, :edit, :update] do
        get :set, as: :set_team, to: 'current_teams#create'
      end
      resources :team_students, as: :students, except: [:create] do
        member do
          get :archive
          post :assign_team_group
          get :move_class
          delete :revoke_team_group
          get :lessons
          get :search_lessons
          post :assign_lessons
          get :restore_student
          get :remove_student
          get :courses
          get :build_language
          get :remove_language
          get :assign_course
          post :assign_course
        end

        collection do
          get :archived_students
          get :clear_archive
          get :import_students
          post :analyze_imported_file
          post :create_batch
          get  :invite_students
          post :send_invitations
          get :available_languages
        end

        resources :activities
      end
      post 'school_students', to: 'team_students#create', as: 'create_students'
      resources :team_groups do
        member do
          get :edit_plan
          put :archive
          put :update_plan
          get :toggle_joinable
          get :assign_course
          post :assign_course
        end
      end
      resources :team_users do
        member do
          get :activities
        end
        collection do
          get  :import_team_users
          post :analyze_imported_file
          post :create_batch
        end
      end
      resources :team_students, only: [] do
        resources :licenses, only: [:create, :update, :destroy] do
          collection do
            get :revoke_license
          end
          put :remove_end_date, on: :member
        end
      end
      resources :lessons
      resources :assignments, as: :documents
      resources :comments do
        post :add_comments, on: :member
        post :document_content_update, on: :collection
      end
      resources :school_assignments, as: :assignments do
        member do
          get :assign_student
          post 'assign_student' => 'school_assignments#assign_student_post'
          get :review
        end
      end
      resources :tests
      resources :activities do
        collection do
          get :activity_logs
        end
        member do
          put :undo_activity
        end
      end
      resources :oauth_apps do
        member do
          put :refresh_secret
        end
      end
      resource :user, only: [:edit, :update], as: :current_profile
      resources :courses, only: [:index, :show] do
        member do
          get :assign_team_group
          post :assign_team_group
        end
        resources :course_sections, only: :show do
          member do
            get :change_view_mode
          end
        end
      end
      get 'search', to: 'search#index', as: :search
      get 'mobile', to: 'mobile#index', as: :mobile
    end
  end

  resources :teams, only: [] do
    resource :team_invitations, path: 'join'
  end

  resources :team_domain_invitations, only: [] do
    patch :accept
    patch :decline
  end

  devise_for :students
  root to: 'students/lessons#index'
  namespace :students, path: '' do
    scope path: 'invitation/:team_id' do
      resource :invitations, path: '', as: :invitation, only: :show do
        post :join, on: :member
      end
    end
    resources :courses, only: %i[show]
    resources :lessons do
      member do
        get 'play(/*any)' => '/static#index'
        get 'tasks(/*any)' => '/static#index'
      end
    end
    namespace :oauth do
      resource :consent, only: :show do
        put :accept
        delete :reject
      end
      resource :login, only: :show do
        put :accept
        delete :reject
      end
    end
    scope defaults: { format: :json } do
      namespace :api do
        devise_scope :student do
          post 'students/otp' => 'sessions#request_otp'
          post 'students/sign_in' => 'sessions#create'
          delete 'students/sign_out' => 'sessions#destroy'
          post 'students/sign_out' => 'sessions#destroy'
          post 'students/sign_up' => 'registrations#create'
        end

        get '/languages(/:scope)', to: "languages#index"
        resources :skills, only: :index

        resources :assignments, only: [:index]
        resource :profile, only: %i[show update destroy]

        scope module: :profiles, path: 'profile', as: :profile do
          resources :student_target_languages, only: %i[create update destroy]
          resources :student_support_languages, only: %i[create update destroy]
          resources :lessons, only: %i[index]
          resources :assignments, only: %i[index]
        end

        resources :courses, only: [:index, :show] do
          get :ratings, on: :member
        end
        resources :ratings, only: [:create, :update]
        resources :rewards, only: [:index] do
          get :upcoming, on: :collection
        end

        resources :lessons, only: [:index, :show] do
          get :phrases, on: :member
          post :filter, on: :collection
          resources :tasks, only: [:show]
          resources :gameplays, only: :create do
            put :finish, on: :member
          end
        end
        scope module: :lessons, as: :lesson, path: 'lessons/:lesson_id' do
          resource :session, only: %i[create show destroy]
          scope module: :tasks, as: :task, path: 'tasks/:task_id' do
            resource :session, only: %i[show]
            resource :document, only: %i[create show]
          end
        end

        resources :lesson_sessions, only: [:show] do
          # TODO: remove next line after frontend moved to new endpoint
          resource :task_session, only: :show, as: :current_task_session
          resources :task_sessions, only: [:index, :show] do
            resources :answers
            member do
              put :answer
              put :heartbeat
              post :complete
            end
            post :next, on: :collection
          end
          resources :results, only: [:index]
        end
        resources :task_sessions, only: [] do
          resources :task_item_sessions, only: :show
        end

        scope path: 'feed', as: 'feed' do
          resources :posts, only: [:index, :show] do
            member do
              post :comment
              post :like
            end
          end
        end

        resources :teams, only: :show do
          member do
            patch :follow
            patch :unfollow
          end
        end

        resources :words, only: [] do
          resources :student_words, only: [] do
            post :play, on: :collection
          end
        end
      end
    end
  end

  get :_health, to: 'cloud#health_check'
  match '/', to: 'static#index', via: :all
  match '/norwegian(/*any)', to: 'static#index', via: :all
  match '/english(/*any)', to: 'static#index', via: :all
  get '*any', via: :all, to: 'errors#not_found'

  resources :summernote_uploads, only: [:create, :destroy]
end
