# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.


ActiveRecord::Schema.define(version: 2020_08_14_132753) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_text_rich_texts", force: :cascade do |t|
    t.string "name", null: false
    t.text "body"
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["record_type", "record_id", "name"], name: "index_action_text_rich_texts_uniqueness", unique: true
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "dictionary_collections", force: :cascade do |t|
    t.string "name", null: false
    t.integer "level"
    t.bigint "language_id", null: false
    t.bigint "words_count", default: 0, null: false
    t.bigint "word_with_audio_count", default: 0, null: false
    t.bigint "word_with_image_count", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "tags", default: [], array: true
    t.index ["name", "language_id"], name: "index_dictionary_collections_on_name_and_language_id", unique: true
  end

  create_table "dictionary_crawlers", force: :cascade do |t|
    t.datetime "started_at"
    t.datetime "finished_at"
    t.string "job_uid"
    t.string "language", null: false
    t.string "url", null: false
    t.string "file_name"
    t.integer "status"
    t.json "csv_file_data", default: {}, null: false
    t.jsonb "sub_domain", default: {}, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "dictionary_word_collections", force: :cascade do |t|
    t.bigint "dictionary_word_id", null: false
    t.bigint "dictionary_collection_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["dictionary_collection_id"], name: "index_dictionary_word_collections_on_dictionary_collection_id"
    t.index ["dictionary_word_id", "dictionary_collection_id"], name: "index_word_collections_on_word_id_and_collection_id", unique: true
    t.index ["dictionary_word_id"], name: "index_dictionary_word_collections_on_dictionary_word_id"
  end

  create_table "dictionary_words", force: :cascade do |t|
    t.string "body", null: false
    t.string "prefix", default: "", null: false
    t.integer "word_class", default: 0, null: false
    t.string "description", default: "", null: false
    t.bigint "frequency", default: 0, null: false
    t.bigint "language_id", null: false
    t.integer "occurrences", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.jsonb "context", default: {}, null: false
  end

  create_table "identities", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "uid"
    t.string "provider"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_identities_on_user_id"
  end

  create_table "languages", force: :cascade do |t|
    t.string "code", null: false
    t.string "system_name", null: false
    t.jsonb "name_translations", default: {}, null: false
    t.jsonb "slug_translations", default: {}, null: false
    t.boolean "active", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "support", default: false, null: false
    t.index ["code"], name: "index_languages_on_code", unique: true
  end

  create_table "lesson_phrases", force: :cascade do |t|
    t.bigint "lesson_id"
    t.bigint "phrase_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["lesson_id"], name: "index_lesson_phrases_on_lesson_id"
    t.index ["phrase_id"], name: "index_lesson_phrases_on_phrase_id"
  end

  create_table "lesson_reviews", force: :cascade do |t|
    t.bigint "lesson_id"
    t.bigint "author_id"
    t.integer "status"
    t.text "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_id"], name: "index_lesson_reviews_on_author_id"
    t.index ["lesson_id"], name: "index_lesson_reviews_on_lesson_id"
  end

  create_table "lesson_sessions", force: :cascade do |t|
    t.bigint "lesson_id"
    t.bigint "student_id"
    t.bigint "current_task_session_id"
    t.integer "status"
    t.integer "progress"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["current_task_session_id"], name: "index_lesson_sessions_on_current_task_session_id"
    t.index ["lesson_id", "student_id", "status"], name: "lesson_sessions_constraint", unique: true, where: "(status = 0)"
    t.index ["lesson_id"], name: "index_lesson_sessions_on_lesson_id"
    t.index ["student_id"], name: "index_lesson_sessions_on_student_id"
  end

  create_table "lessons", force: :cascade do |t|
    t.bigint "author_id"
    t.string "title"
    t.datetime "discarded_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "objectives", default: [], null: false, array: true
    t.integer "kind", default: 0, null: false
    t.integer "level", default: 0, null: false
    t.jsonb "meta", default: {}, null: false
    t.boolean "published", default: false, null: false
    t.integer "parent_id"
    t.bigint "language_id"
    t.bigint "support_language_id"
    t.integer "status", default: 0, null: false
    t.integer "team_id"
    t.string "tags", default: [], array: true
    t.text "image_data"
    t.index ["author_id"], name: "index_lessons_on_author_id"
    t.index ["discarded_at"], name: "index_lessons_on_discarded_at"
    t.index ["language_id"], name: "index_lessons_on_language_id"
    t.index ["support_language_id"], name: "index_lessons_on_support_language_id"
    t.index ["team_id"], name: "index_lessons_on_team_id"
  end

  create_table "pg_search_documents", force: :cascade do |t|
    t.text "content"
    t.string "searchable_type"
    t.bigint "searchable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["searchable_type", "searchable_id"], name: "index_pg_search_documents_on_searchable_type_and_searchable_id"
  end

  create_table "phrases", force: :cascade do |t|
    t.string "value"
    t.index ["value"], name: "index_phrases_on_value", unique: true
  end

  create_table "skills", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "name_translations", default: {}, null: false
  end

  create_table "student_identities", force: :cascade do |t|
    t.bigint "student_id", null: false
    t.string "uid"
    t.string "provider"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["student_id"], name: "index_student_identities_on_student_id"
  end

  create_table "student_item_solutions", force: :cascade do |t|
    t.bigint "task_item_id", null: false
    t.bigint "student_solution_id", null: false
    t.jsonb "context"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["student_solution_id"], name: "index_student_item_solutions_on_student_solution_id"
    t.index ["task_item_id"], name: "index_student_item_solutions_on_task_item_id"
  end

  create_table "student_option_solutions", force: :cascade do |t|
    t.bigint "task_item_option_id", null: false
    t.bigint "student_item_solution_id", null: false
    t.jsonb "context"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["student_item_solution_id"], name: "index_student_option_solutions_on_student_item_solution_id"
    t.index ["task_item_option_id"], name: "index_student_option_solutions_on_task_item_option_id"
  end

  create_table "student_solutions", force: :cascade do |t|
    t.jsonb "solution", default: {}, null: false
    t.jsonb "task_snapshot", default: {}, null: false
    t.boolean "correct", default: false
    t.integer "score"
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["discarded_at"], name: "index_student_solutions_on_discarded_at"
  end

  create_table "students", force: :cascade do |t|
    t.string "fname"
    t.string "lname"
    t.string "email", default: "", null: false
    t.string "mobile"
    t.string "locale"
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "gender", default: 0, null: false
    t.string "ssn", default: "", null: false
    t.bigint "language_id"
    t.bigint "native_language_id"
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "team_followings_count", default: 0
    t.text "avatar_data"
    t.index ["discarded_at"], name: "index_students_on_discarded_at"
    t.index ["email"], name: "index_students_on_email", unique: true
    t.index ["language_id"], name: "index_students_on_language_id"
    t.index ["native_language_id"], name: "index_students_on_native_language_id"
    t.index ["reset_password_token"], name: "index_students_on_reset_password_token", unique: true
  end

  create_table "task_item_options", force: :cascade do |t|
    t.bigint "task_item_id"
    t.boolean "correct"
    t.string "text_option"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "context", default: {}, null: false
    t.string "type"
    t.index ["task_item_id"], name: "index_task_item_options_on_task_item_id"
  end

  create_table "task_items", force: :cascade do |t|
    t.bigint "task_id"
    t.string "type", null: false
    t.jsonb "context", default: {}, null: false
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "position", default: 0, null: false
    t.jsonb "translations", default: {}
    t.index ["discarded_at"], name: "index_task_items_on_discarded_at"
    t.index ["task_id"], name: "index_task_items_on_task_id"
    t.index ["type"], name: "index_task_items_on_type"
  end

  create_table "task_sessions", force: :cascade do |t|
    t.bigint "task_id"
    t.bigint "lesson_session_id"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["lesson_session_id"], name: "index_task_sessions_on_lesson_session_id"
    t.index ["task_id"], name: "index_task_sessions_on_task_id"
  end

  create_table "task_skills", force: :cascade do |t|
    t.bigint "task_id"
    t.bigint "skill_id"
    t.index ["skill_id"], name: "index_task_skills_on_skill_id"
    t.index ["task_id"], name: "index_task_skills_on_task_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.string "type", null: false
    t.text "introduction"
    t.integer "complexity", default: 0
    t.float "performance"
    t.boolean "ordered_solution", default: false
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "context", default: {}, null: false
    t.boolean "published", default: true, null: false
    t.integer "score_method", default: 0, null: false
    t.boolean "snapshot", default: false, null: false
    t.datetime "snapshot_timestamp"
    t.integer "parent_id"
    t.integer "subject", default: 0, null: false
    t.integer "rank", default: 0
    t.integer "lesson_id"
    t.integer "position"
    t.index ["discarded_at"], name: "index_tasks_on_discarded_at"
    t.index ["lesson_id"], name: "index_tasks_on_lesson_id"
    t.index ["rank"], name: "index_tasks_on_rank"
    t.index ["snapshot", "parent_id", "snapshot_timestamp"], name: "index_tasks_on_snapshot_and_parent_id_and_snapshot_timestamp"
    t.index ["subject"], name: "index_tasks_on_subject"
    t.index ["type"], name: "index_tasks_on_type"
  end

  create_table "team_domains", force: :cascade do |t|
    t.bigint "team_id", null: false
    t.string "domain", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["domain", "team_id"], name: "index_team_domains_on_domain_and_team_id", unique: true
    t.index ["team_id"], name: "index_team_domains_on_team_id"
  end

  create_table "team_followers", force: :cascade do |t|
    t.bigint "team_id", null: false
    t.bigint "student_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["student_id"], name: "index_team_followers_on_student_id"
    t.index ["team_id", "student_id"], name: "index_team_followers_on_team_id_and_student_id", unique: true
    t.index ["team_id"], name: "index_team_followers_on_team_id"
  end

  create_table "team_invitations", force: :cascade do |t|
    t.bigint "team_domain_id", null: false
    t.bigint "user_id", null: false
    t.integer "status", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["team_domain_id"], name: "index_team_invitations_on_team_domain_id"
    t.index ["user_id", "team_domain_id"], name: "index_team_invitations_on_user_id_and_team_domain_id", unique: true
    t.index ["user_id"], name: "index_team_invitations_on_user_id"
  end

  create_table "team_users", force: :cascade do |t|
    t.bigint "team_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "default", default: false
    t.integer "role"
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_team_users_on_discarded_at"
    t.index ["team_id", "user_id"], name: "index_team_users_on_team_id_and_user_id", unique: true, where: "(discarded_at IS NULL)"
    t.index ["team_id"], name: "index_team_users_on_team_id"
    t.index ["user_id"], name: "index_team_users_on_user_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.bigint "owner_id"
    t.integer "status", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "discarded_at"
    t.text "image_data"
    t.integer "followers_count", default: 0
    t.integer "lessons_count", default: 0, null: false
    t.jsonb "meta", default: {}, null: false
    t.index ["discarded_at"], name: "index_teams_on_discarded_at"
    t.index ["owner_id"], name: "index_teams_on_owner_id"
  end

  create_table "user_languages", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "language_id", null: false
    t.integer "level", default: 0
    t.jsonb "meta"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["language_id"], name: "index_user_languages_on_language_id"
    t.index ["user_id"], name: "index_user_languages_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "fname"
    t.string "lname"
    t.string "email"
    t.string "mobile"
    t.string "locale"
    t.integer "role", default: 0, null: false
    t.integer "status", default: 0, null: false
    t.jsonb "meta", default: {}, null: false
    t.datetime "discarded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "credits", default: 0
    t.text "avatar_data"
    t.index ["discarded_at"], name: "index_users_on_discarded_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "versions", force: :cascade do |t|
    t.string "item_type", null: false
    t.bigint "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.jsonb "object"
    t.datetime "created_at"
    t.jsonb "object_changes"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "dictionary_word_collections", "dictionary_collections"
  add_foreign_key "dictionary_word_collections", "dictionary_words"
  add_foreign_key "identities", "users"
  add_foreign_key "lesson_sessions", "lessons"
  add_foreign_key "lesson_sessions", "students"
  add_foreign_key "lesson_sessions", "task_sessions", column: "current_task_session_id"
  add_foreign_key "lessons", "lessons", column: "parent_id"
  add_foreign_key "student_identities", "students"
  add_foreign_key "student_item_solutions", "student_solutions"
  add_foreign_key "student_item_solutions", "task_items"
  add_foreign_key "student_option_solutions", "student_item_solutions"
  add_foreign_key "student_option_solutions", "task_item_options"
  add_foreign_key "task_item_options", "task_items"
  add_foreign_key "task_items", "tasks"
  add_foreign_key "task_sessions", "lesson_sessions"
  add_foreign_key "task_sessions", "tasks"
  add_foreign_key "team_domains", "teams"
  add_foreign_key "team_followers", "students"
  add_foreign_key "team_followers", "teams"
  add_foreign_key "team_invitations", "team_domains"
  add_foreign_key "team_invitations", "users"
end
