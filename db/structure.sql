SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: cc_course__lessons_count(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.cc_course__lessons_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      BEGIN
          IF TG_OP IN ('UPDATE', 'DELETE') THEN
              UPDATE "courses"
              SET "lessons_count" = "lessons_count" - 1
              FROM "course_sections"
              WHERE "course_sections"."id" = OLD."course_section_id"
                AND "course_sections"."course_id" = "courses"."id";
          END IF;
          IF TG_OP IN ('INSERT', 'UPDATE') THEN
              UPDATE "courses"
              SET "lessons_count" = "lessons_count" + 1
              FROM "course_sections"
              WHERE "course_sections"."id" = NEW."course_section_id"
                AND "course_sections"."course_id" = "courses"."id";
          END IF;
          RETURN NULL;
      END;
      $$;


SET default_tablespace = '';

--
-- Name: action_text_rich_texts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.action_text_rich_texts (
    id bigint NOT NULL,
    name character varying NOT NULL,
    body text,
    record_type character varying NOT NULL,
    record_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: action_text_rich_texts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.action_text_rich_texts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: action_text_rich_texts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.action_text_rich_texts_id_seq OWNED BY public.action_text_rich_texts.id;


--
-- Name: active_storage_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.active_storage_attachments (
    id bigint NOT NULL,
    name character varying NOT NULL,
    record_type character varying NOT NULL,
    record_id bigint NOT NULL,
    blob_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL
);


--
-- Name: active_storage_attachments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.active_storage_attachments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: active_storage_attachments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.active_storage_attachments_id_seq OWNED BY public.active_storage_attachments.id;


--
-- Name: active_storage_blobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.active_storage_blobs (
    id bigint NOT NULL,
    key character varying NOT NULL,
    filename character varying NOT NULL,
    content_type character varying,
    metadata text,
    byte_size bigint NOT NULL,
    checksum character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    service_name character varying NOT NULL
);


--
-- Name: active_storage_blobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.active_storage_blobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: active_storage_blobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.active_storage_blobs_id_seq OWNED BY public.active_storage_blobs.id;


--
-- Name: active_storage_variant_records; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.active_storage_variant_records (
    id bigint NOT NULL,
    blob_id bigint NOT NULL,
    variation_digest character varying NOT NULL
);


--
-- Name: active_storage_variant_records_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.active_storage_variant_records_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: active_storage_variant_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.active_storage_variant_records_id_seq OWNED BY public.active_storage_variant_records.id;


--
-- Name: activities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activities (
    id bigint NOT NULL,
    trackable_type character varying,
    trackable_id bigint,
    owner_type character varying,
    owner_id bigint,
    key character varying,
    parameters text,
    recipient_type character varying,
    recipient_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.activities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activities.id;


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: assignments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assignments (
    id bigint NOT NULL,
    team_id bigint NOT NULL,
    language_id bigint NOT NULL,
    name character varying DEFAULT ''::character varying NOT NULL,
    context integer DEFAULT 0 NOT NULL,
    instruction text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.assignments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.assignments_id_seq OWNED BY public.assignments.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    content character varying NOT NULL,
    commentable_type character varying NOT NULL,
    commentable_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    author_type character varying NOT NULL,
    author_id bigint NOT NULL,
    audio_data text
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: course_sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.course_sections (
    id bigint NOT NULL,
    course_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    name character varying DEFAULT ''::character varying NOT NULL,
    "position" integer DEFAULT 0 NOT NULL
);


--
-- Name: course_sections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.course_sections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: course_sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.course_sections_id_seq OWNED BY public.course_sections.id;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.courses (
    id bigint NOT NULL,
    title character varying NOT NULL,
    description character varying,
    image_data text,
    lessons_count integer DEFAULT 0 NOT NULL,
    rating double precision,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    discarded_at timestamp without time zone,
    author_id integer,
    team_id integer,
    sections_count integer DEFAULT 0,
    language_id bigint,
    slug character varying,
    published boolean DEFAULT false NOT NULL,
    level integer DEFAULT 0 NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb NOT NULL
);


--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: dictionary_collections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dictionary_collections (
    id bigint NOT NULL,
    name character varying NOT NULL,
    level integer,
    language_id bigint NOT NULL,
    words_count bigint DEFAULT 0 NOT NULL,
    word_with_audio_count bigint DEFAULT 0 NOT NULL,
    word_with_image_count bigint DEFAULT 0 NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    tags character varying[] DEFAULT '{}'::character varying[]
);


--
-- Name: dictionary_collections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dictionary_collections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dictionary_collections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dictionary_collections_id_seq OWNED BY public.dictionary_collections.id;


--
-- Name: dictionary_crawlers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dictionary_crawlers (
    id bigint NOT NULL,
    started_at timestamp without time zone,
    finished_at timestamp without time zone,
    job_uid character varying,
    language character varying NOT NULL,
    url character varying NOT NULL,
    file_name character varying,
    status integer,
    csv_file_data json DEFAULT '{}'::json NOT NULL,
    sub_domain jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: dictionary_crawlers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dictionary_crawlers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dictionary_crawlers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dictionary_crawlers_id_seq OWNED BY public.dictionary_crawlers.id;


--
-- Name: dictionary_import_words; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dictionary_import_words (
    id bigint NOT NULL,
    dictionary_import_id bigint NOT NULL,
    dictionary_word_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: dictionary_import_words_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dictionary_import_words_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dictionary_import_words_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dictionary_import_words_id_seq OWNED BY public.dictionary_import_words.id;


--
-- Name: dictionary_imports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dictionary_imports (
    id bigint NOT NULL,
    name character varying NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: dictionary_imports_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dictionary_imports_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dictionary_imports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dictionary_imports_id_seq OWNED BY public.dictionary_imports.id;


--
-- Name: dictionary_word_collections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dictionary_word_collections (
    id bigint NOT NULL,
    dictionary_word_id bigint NOT NULL,
    dictionary_collection_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: dictionary_word_collections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dictionary_word_collections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dictionary_word_collections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dictionary_word_collections_id_seq OWNED BY public.dictionary_word_collections.id;


--
-- Name: dictionary_words; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dictionary_words (
    id bigint NOT NULL,
    body character varying NOT NULL,
    prefix character varying DEFAULT ''::character varying NOT NULL,
    word_class integer DEFAULT 0 NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    frequency bigint DEFAULT 0 NOT NULL,
    language_id bigint NOT NULL,
    occurrences integer DEFAULT 0 NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    translations jsonb DEFAULT '{}'::jsonb,
    color_required boolean DEFAULT false
);


--
-- Name: dictionary_words_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dictionary_words_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dictionary_words_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dictionary_words_id_seq OWNED BY public.dictionary_words.id;


--
-- Name: documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.documents (
    id bigint NOT NULL,
    task_item_id bigint,
    student_id bigint NOT NULL,
    team_id bigint,
    content text,
    audio_data text,
    status integer DEFAULT 0 NOT NULL,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    comments_count integer DEFAULT 0 NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    student_assignment_id integer,
    assignable_type character varying NOT NULL,
    assignable_id bigint NOT NULL
);


--
-- Name: documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.documents_id_seq OWNED BY public.documents.id;


--
-- Name: gameplays; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gameplays (
    id bigint NOT NULL,
    student_id bigint NOT NULL,
    game_type character varying,
    time_spent integer DEFAULT 0,
    attempts integer DEFAULT 0,
    completed_at timestamp without time zone,
    xp_earned integer DEFAULT 0,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: gameplays_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.gameplays_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: gameplays_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.gameplays_id_seq OWNED BY public.gameplays.id;


--
-- Name: identities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.identities (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    uid character varying,
    provider character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: identities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.identities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: identities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.identities_id_seq OWNED BY public.identities.id;


--
-- Name: languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.languages (
    id bigint NOT NULL,
    code character varying NOT NULL,
    system_name character varying NOT NULL,
    name_translations jsonb DEFAULT '{}'::jsonb NOT NULL,
    slug_translations jsonb DEFAULT '{}'::jsonb NOT NULL,
    active boolean DEFAULT false NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    support boolean DEFAULT false NOT NULL,
    words_count integer DEFAULT 0 NOT NULL,
    collections_count integer DEFAULT 0 NOT NULL,
    characters character varying[] DEFAULT '{}'::character varying[] NOT NULL,
    restricted boolean DEFAULT false NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb NOT NULL
);


--
-- Name: languages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.languages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;


--
-- Name: lesson_phrases; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lesson_phrases (
    id bigint NOT NULL,
    lesson_id bigint,
    phrase_id bigint,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: lesson_phrases_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lesson_phrases_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lesson_phrases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lesson_phrases_id_seq OWNED BY public.lesson_phrases.id;


--
-- Name: lesson_reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lesson_reviews (
    id bigint NOT NULL,
    lesson_id bigint,
    author_id bigint,
    status integer,
    content text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: lesson_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lesson_reviews_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lesson_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lesson_reviews_id_seq OWNED BY public.lesson_reviews.id;


--
-- Name: lesson_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lesson_sessions (
    id bigint NOT NULL,
    lesson_id bigint,
    student_id bigint,
    current_task_session_id bigint,
    status integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    progress jsonb,
    duration integer
);


--
-- Name: lesson_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lesson_sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lesson_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lesson_sessions_id_seq OWNED BY public.lesson_sessions.id;


--
-- Name: lesson_skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lesson_skills (
    id bigint NOT NULL,
    lesson_id bigint,
    skill_id bigint
);


--
-- Name: lesson_skills_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lesson_skills_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lesson_skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lesson_skills_id_seq OWNED BY public.lesson_skills.id;


--
-- Name: lessons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lessons (
    id bigint NOT NULL,
    author_id bigint,
    title character varying,
    discarded_at timestamp without time zone,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    objectives character varying[] DEFAULT '{}'::character varying[] NOT NULL,
    kind integer DEFAULT 0 NOT NULL,
    level integer DEFAULT 0 NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb NOT NULL,
    published boolean DEFAULT false NOT NULL,
    parent_id integer,
    language_id bigint,
    support_language_id bigint,
    status integer DEFAULT 0 NOT NULL,
    team_id integer,
    tags character varying[] DEFAULT '{}'::character varying[],
    image_data text,
    ratings_count integer DEFAULT 0 NOT NULL,
    total_rating integer DEFAULT 0 NOT NULL,
    phrases_count integer DEFAULT 0,
    average_duration integer,
    course_section_id bigint,
    "position" integer DEFAULT 0 NOT NULL
);


--
-- Name: lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lessons_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lessons_id_seq OWNED BY public.lessons.id;


--
-- Name: licenses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.licenses (
    id bigint NOT NULL,
    team_student_id bigint NOT NULL,
    plan_id bigint NOT NULL,
    expires_at timestamp without time zone,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: licenses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.licenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: licenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.licenses_id_seq OWNED BY public.licenses.id;


--
-- Name: oauth_apps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.oauth_apps (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    secret character varying NOT NULL,
    redirect_uris character varying[] DEFAULT '{}'::character varying[] NOT NULL,
    team_id integer,
    client_data jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: pg_search_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pg_search_documents (
    id bigint NOT NULL,
    content text,
    searchable_type character varying,
    searchable_id bigint,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    team_ids integer[] DEFAULT '{}'::integer[]
);


--
-- Name: pg_search_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pg_search_documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pg_search_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pg_search_documents_id_seq OWNED BY public.pg_search_documents.id;


--
-- Name: plans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.plans (
    id bigint NOT NULL,
    language_id bigint NOT NULL,
    system_name character varying,
    name_translations jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    price_cents integer NOT NULL,
    price_currency character varying NOT NULL,
    plan_interval integer NOT NULL
);


--
-- Name: plans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.plans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.plans_id_seq OWNED BY public.plans.id;


--
-- Name: post_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_likes (
    id bigint NOT NULL,
    student_id bigint NOT NULL,
    post_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: post_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_likes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_likes_id_seq OWNED BY public.post_likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id bigint NOT NULL,
    content text NOT NULL,
    team_id bigint NOT NULL,
    author_id bigint NOT NULL,
    lesson_id bigint,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    discarded_at timestamp without time zone,
    likes_count integer DEFAULT 0 NOT NULL,
    comments_count integer DEFAULT 0 NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ratings (
    id bigint NOT NULL,
    student_id bigint NOT NULL,
    lesson_id bigint NOT NULL,
    rate integer DEFAULT 0 NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ratings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;


--
-- Name: rewards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rewards (
    id bigint NOT NULL,
    language_id bigint,
    name character varying NOT NULL,
    description character varying,
    image_data text,
    kind integer DEFAULT 0 NOT NULL,
    dimension integer DEFAULT 0 NOT NULL,
    value integer,
    discarded_at timestamp without time zone,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: rewards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rewards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: rewards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rewards_id_seq OWNED BY public.rewards.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: skills; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.skills (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name_translations jsonb DEFAULT '{}'::jsonb NOT NULL
);


--
-- Name: skills_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.skills_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.skills_id_seq OWNED BY public.skills.id;


--
-- Name: student_assignments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_assignments (
    id bigint NOT NULL,
    assignment_id bigint NOT NULL,
    student_id bigint NOT NULL,
    passed_at timestamp without time zone,
    deadline timestamp without time zone,
    status integer DEFAULT 0 NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: student_assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.student_assignments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: student_assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.student_assignments_id_seq OWNED BY public.student_assignments.id;


--
-- Name: student_identities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_identities (
    id bigint NOT NULL,
    student_id bigint NOT NULL,
    uid character varying,
    provider character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: student_identities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.student_identities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: student_identities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.student_identities_id_seq OWNED BY public.student_identities.id;


--
-- Name: student_item_solutions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_item_solutions (
    id bigint NOT NULL,
    task_item_id bigint NOT NULL,
    student_solution_id bigint NOT NULL,
    context jsonb,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: student_item_solutions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.student_item_solutions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: student_item_solutions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.student_item_solutions_id_seq OWNED BY public.student_item_solutions.id;


--
-- Name: student_jwt_deny_list; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_jwt_deny_list (
    id bigint NOT NULL,
    jti character varying NOT NULL,
    exp timestamp with time zone NOT NULL
);


--
-- Name: student_jwt_deny_list_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.student_jwt_deny_list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: student_jwt_deny_list_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.student_jwt_deny_list_id_seq OWNED BY public.student_jwt_deny_list.id;


--
-- Name: student_option_solutions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_option_solutions (
    id bigint NOT NULL,
    task_item_option_id bigint NOT NULL,
    student_item_solution_id bigint NOT NULL,
    context jsonb,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: student_option_solutions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.student_option_solutions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: student_option_solutions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.student_option_solutions_id_seq OWNED BY public.student_option_solutions.id;


--
-- Name: student_rewards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_rewards (
    id bigint NOT NULL,
    student_id bigint,
    reward_id bigint,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: student_rewards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.student_rewards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: student_rewards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.student_rewards_id_seq OWNED BY public.student_rewards.id;


--
-- Name: student_solutions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_solutions (
    id bigint NOT NULL,
    solution jsonb DEFAULT '{}'::jsonb NOT NULL,
    task_snapshot jsonb DEFAULT '{}'::jsonb NOT NULL,
    correct boolean DEFAULT false,
    score integer,
    discarded_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: student_solutions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.student_solutions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: student_solutions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.student_solutions_id_seq OWNED BY public.student_solutions.id;


--
-- Name: student_support_languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_support_languages (
    id bigint NOT NULL,
    student_id bigint NOT NULL,
    language_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: student_support_languages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.student_support_languages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: student_support_languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.student_support_languages_id_seq OWNED BY public.student_support_languages.id;


--
-- Name: student_target_languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_target_languages (
    id bigint NOT NULL,
    student_id bigint,
    language_id bigint,
    level integer DEFAULT 0 NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: student_target_languages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.student_target_languages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: student_target_languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.student_target_languages_id_seq OWNED BY public.student_target_languages.id;


--
-- Name: student_words; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.student_words (
    id bigint NOT NULL,
    student_id bigint NOT NULL,
    word_id bigint,
    played_count integer DEFAULT 0,
    solved_count integer DEFAULT 0,
    last_played_at timestamp without time zone,
    last_failed_at timestamp without time zone,
    last_solved_at timestamp without time zone,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: student_words_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.student_words_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: student_words_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.student_words_id_seq OWNED BY public.student_words.id;


--
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students (
    id bigint NOT NULL,
    fname character varying,
    lname character varying,
    email character varying DEFAULT ''::character varying NOT NULL,
    mobile character varying,
    locale character varying,
    discarded_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    gender integer DEFAULT 0 NOT NULL,
    ssn character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    team_followings_count integer DEFAULT 0,
    avatar_data text,
    active_student_target_language_id integer,
    student_words_count integer DEFAULT 0 NOT NULL,
    student_rewards_count integer DEFAULT 0,
    otp_secret character varying,
    last_otp_at timestamp without time zone,
    failed_attempts integer DEFAULT 0 NOT NULL,
    unlock_token character varying,
    locked_at timestamp without time zone,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip character varying,
    last_sign_in_ip character varying,
    time_zone character varying,
    native_student_support_language_id integer
);


--
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- Name: summernote_uploads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.summernote_uploads (
    id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    image_data text
);


--
-- Name: summernote_uploads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.summernote_uploads_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: summernote_uploads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.summernote_uploads_id_seq OWNED BY public.summernote_uploads.id;


--
-- Name: task_item_options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.task_item_options (
    id bigint NOT NULL,
    task_item_id bigint,
    correct boolean,
    text_option character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    type character varying
);


--
-- Name: task_item_options_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.task_item_options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: task_item_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.task_item_options_id_seq OWNED BY public.task_item_options.id;


--
-- Name: task_item_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.task_item_sessions (
    id bigint NOT NULL,
    task_session_id bigint,
    task_item_id bigint,
    data jsonb,
    answer jsonb,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    completed boolean DEFAULT false,
    attempts_count integer DEFAULT 0 NOT NULL,
    type character varying NOT NULL,
    correct boolean
);


--
-- Name: task_item_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.task_item_sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: task_item_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.task_item_sessions_id_seq OWNED BY public.task_item_sessions.id;


--
-- Name: task_item_words; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.task_item_words (
    id bigint NOT NULL,
    task_item_id bigint,
    word_id bigint
);


--
-- Name: task_item_words_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.task_item_words_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: task_item_words_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.task_item_words_id_seq OWNED BY public.task_item_words.id;


--
-- Name: task_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.task_items (
    id bigint NOT NULL,
    task_id bigint,
    type character varying NOT NULL,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    discarded_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    "position" integer DEFAULT 0 NOT NULL,
    translations jsonb DEFAULT '{}'::jsonb
);


--
-- Name: task_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.task_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: task_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.task_items_id_seq OWNED BY public.task_items.id;


--
-- Name: task_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.task_sessions (
    id bigint NOT NULL,
    task_id bigint,
    lesson_session_id bigint,
    status integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    type character varying,
    duration integer
);


--
-- Name: task_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.task_sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: task_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.task_sessions_id_seq OWNED BY public.task_sessions.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tasks (
    id bigint NOT NULL,
    name character varying,
    type character varying NOT NULL,
    introduction text,
    complexity integer DEFAULT 0,
    performance double precision,
    ordered_solution boolean DEFAULT false,
    discarded_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    context jsonb DEFAULT '{}'::jsonb NOT NULL,
    published boolean DEFAULT true NOT NULL,
    score_method integer DEFAULT 0 NOT NULL,
    snapshot boolean DEFAULT false NOT NULL,
    snapshot_timestamp timestamp without time zone,
    parent_id integer,
    subject integer DEFAULT 0 NOT NULL,
    rank integer DEFAULT 0,
    lesson_id integer,
    "position" integer
);


--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: team_domains; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_domains (
    id bigint NOT NULL,
    team_id bigint NOT NULL,
    domain character varying NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: team_domains_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.team_domains_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_domains_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.team_domains_id_seq OWNED BY public.team_domains.id;


--
-- Name: team_followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_followers (
    id bigint NOT NULL,
    team_id bigint NOT NULL,
    student_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: team_followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.team_followers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.team_followers_id_seq OWNED BY public.team_followers.id;


--
-- Name: team_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_groups (
    id bigint NOT NULL,
    team_id bigint,
    language_id bigint,
    name character varying NOT NULL,
    level integer NOT NULL,
    discarded_at timestamp without time zone,
    archived_at timestamp without time zone,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    team_students_count integer DEFAULT 0 NOT NULL,
    joinable boolean DEFAULT true NOT NULL,
    course_id integer
);


--
-- Name: team_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.team_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.team_groups_id_seq OWNED BY public.team_groups.id;


--
-- Name: team_invitations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_invitations (
    id bigint NOT NULL,
    team_domain_id bigint NOT NULL,
    user_id bigint NOT NULL,
    status integer DEFAULT 0,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: team_invitations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.team_invitations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_invitations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.team_invitations_id_seq OWNED BY public.team_invitations.id;


--
-- Name: team_students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_students (
    id bigint NOT NULL,
    team_id bigint NOT NULL,
    student_id bigint NOT NULL,
    archived_at timestamp without time zone,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    discarded_at timestamp without time zone,
    team_group_id bigint,
    active_license_id integer,
    course_id integer
);


--
-- Name: team_students_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.team_students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.team_students_id_seq OWNED BY public.team_students.id;


--
-- Name: team_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.team_users (
    id bigint NOT NULL,
    team_id bigint,
    user_id bigint,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    legacy_default boolean DEFAULT false,
    role integer DEFAULT 0 NOT NULL,
    discarded_at timestamp without time zone,
    hubspot_associated boolean DEFAULT false
);


--
-- Name: team_users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.team_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: team_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.team_users_id_seq OWNED BY public.team_users.id;


--
-- Name: teams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teams (
    id bigint NOT NULL,
    name character varying,
    owner_id bigint,
    status integer DEFAULT 0,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    discarded_at timestamp without time zone,
    image_data text,
    followers_count integer DEFAULT 0,
    lessons_count integer DEFAULT 0 NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb NOT NULL,
    abilities character varying[] DEFAULT '{}'::character varying[],
    active_students_count integer DEFAULT 0,
    gdpr_consent_at timestamp without time zone,
    default_language_id bigint,
    business_registration_id character varying,
    lingutest_enabled boolean DEFAULT false NOT NULL,
    hubspotid character varying
);


--
-- Name: teams_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.teams_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: teams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.teams_id_seq OWNED BY public.teams.id;


--
-- Name: user_languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_languages (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    language_id bigint NOT NULL,
    level integer DEFAULT 0,
    meta jsonb,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: user_languages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_languages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_languages_id_seq OWNED BY public.user_languages.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    fname character varying,
    lname character varying,
    email character varying,
    mobile character varying,
    locale character varying,
    role integer DEFAULT 0 NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    meta jsonb DEFAULT '{}'::jsonb NOT NULL,
    discarded_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    credits integer DEFAULT 0,
    avatar_data text,
    lessons_count integer DEFAULT 0 NOT NULL,
    otp_secret character varying,
    last_otp_at timestamp without time zone,
    failed_attempts integer DEFAULT 0 NOT NULL,
    unlock_token character varying,
    locked_at timestamp without time zone,
    default_team_user_id integer,
    sign_in_count integer DEFAULT 0 NOT NULL,
    current_sign_in_at timestamp without time zone,
    last_sign_in_at timestamp without time zone,
    current_sign_in_ip character varying,
    last_sign_in_ip character varying,
    time_zone character varying,
    hubspotid character varying
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: versions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.versions (
    id bigint NOT NULL,
    item_type character varying NOT NULL,
    item_id bigint NOT NULL,
    event character varying NOT NULL,
    whodunnit character varying,
    object jsonb,
    created_at timestamp without time zone,
    object_changes jsonb
);


--
-- Name: versions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.versions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: versions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.versions_id_seq OWNED BY public.versions.id;


--
-- Name: wordplays; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wordplays (
    id bigint NOT NULL,
    word_id bigint,
    gameplay_id bigint NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: wordplays_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wordplays_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wordplays_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wordplays_id_seq OWNED BY public.wordplays.id;


--
-- Name: action_text_rich_texts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.action_text_rich_texts ALTER COLUMN id SET DEFAULT nextval('public.action_text_rich_texts_id_seq'::regclass);


--
-- Name: active_storage_attachments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_attachments ALTER COLUMN id SET DEFAULT nextval('public.active_storage_attachments_id_seq'::regclass);


--
-- Name: active_storage_blobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_blobs ALTER COLUMN id SET DEFAULT nextval('public.active_storage_blobs_id_seq'::regclass);


--
-- Name: active_storage_variant_records id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_variant_records ALTER COLUMN id SET DEFAULT nextval('public.active_storage_variant_records_id_seq'::regclass);


--
-- Name: activities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activities ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);


--
-- Name: assignments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assignments ALTER COLUMN id SET DEFAULT nextval('public.assignments_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: course_sections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course_sections ALTER COLUMN id SET DEFAULT nextval('public.course_sections_id_seq'::regclass);


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: dictionary_collections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_collections ALTER COLUMN id SET DEFAULT nextval('public.dictionary_collections_id_seq'::regclass);


--
-- Name: dictionary_crawlers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_crawlers ALTER COLUMN id SET DEFAULT nextval('public.dictionary_crawlers_id_seq'::regclass);


--
-- Name: dictionary_import_words id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_import_words ALTER COLUMN id SET DEFAULT nextval('public.dictionary_import_words_id_seq'::regclass);


--
-- Name: dictionary_imports id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_imports ALTER COLUMN id SET DEFAULT nextval('public.dictionary_imports_id_seq'::regclass);


--
-- Name: dictionary_word_collections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_word_collections ALTER COLUMN id SET DEFAULT nextval('public.dictionary_word_collections_id_seq'::regclass);


--
-- Name: dictionary_words id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_words ALTER COLUMN id SET DEFAULT nextval('public.dictionary_words_id_seq'::regclass);


--
-- Name: documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents ALTER COLUMN id SET DEFAULT nextval('public.documents_id_seq'::regclass);


--
-- Name: gameplays id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gameplays ALTER COLUMN id SET DEFAULT nextval('public.gameplays_id_seq'::regclass);


--
-- Name: identities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identities ALTER COLUMN id SET DEFAULT nextval('public.identities_id_seq'::regclass);


--
-- Name: languages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);


--
-- Name: lesson_phrases id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_phrases ALTER COLUMN id SET DEFAULT nextval('public.lesson_phrases_id_seq'::regclass);


--
-- Name: lesson_reviews id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_reviews ALTER COLUMN id SET DEFAULT nextval('public.lesson_reviews_id_seq'::regclass);


--
-- Name: lesson_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_sessions ALTER COLUMN id SET DEFAULT nextval('public.lesson_sessions_id_seq'::regclass);


--
-- Name: lesson_skills id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_skills ALTER COLUMN id SET DEFAULT nextval('public.lesson_skills_id_seq'::regclass);


--
-- Name: lessons id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lessons ALTER COLUMN id SET DEFAULT nextval('public.lessons_id_seq'::regclass);


--
-- Name: licenses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.licenses ALTER COLUMN id SET DEFAULT nextval('public.licenses_id_seq'::regclass);


--
-- Name: pg_search_documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pg_search_documents ALTER COLUMN id SET DEFAULT nextval('public.pg_search_documents_id_seq'::regclass);


--
-- Name: plans id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plans ALTER COLUMN id SET DEFAULT nextval('public.plans_id_seq'::regclass);


--
-- Name: post_likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_likes ALTER COLUMN id SET DEFAULT nextval('public.post_likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: ratings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);


--
-- Name: rewards id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rewards ALTER COLUMN id SET DEFAULT nextval('public.rewards_id_seq'::regclass);


--
-- Name: skills id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills ALTER COLUMN id SET DEFAULT nextval('public.skills_id_seq'::regclass);


--
-- Name: student_assignments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_assignments ALTER COLUMN id SET DEFAULT nextval('public.student_assignments_id_seq'::regclass);


--
-- Name: student_identities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_identities ALTER COLUMN id SET DEFAULT nextval('public.student_identities_id_seq'::regclass);


--
-- Name: student_item_solutions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_item_solutions ALTER COLUMN id SET DEFAULT nextval('public.student_item_solutions_id_seq'::regclass);


--
-- Name: student_jwt_deny_list id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_jwt_deny_list ALTER COLUMN id SET DEFAULT nextval('public.student_jwt_deny_list_id_seq'::regclass);


--
-- Name: student_option_solutions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_option_solutions ALTER COLUMN id SET DEFAULT nextval('public.student_option_solutions_id_seq'::regclass);


--
-- Name: student_rewards id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_rewards ALTER COLUMN id SET DEFAULT nextval('public.student_rewards_id_seq'::regclass);


--
-- Name: student_solutions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_solutions ALTER COLUMN id SET DEFAULT nextval('public.student_solutions_id_seq'::regclass);


--
-- Name: student_support_languages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_support_languages ALTER COLUMN id SET DEFAULT nextval('public.student_support_languages_id_seq'::regclass);


--
-- Name: student_target_languages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_target_languages ALTER COLUMN id SET DEFAULT nextval('public.student_target_languages_id_seq'::regclass);


--
-- Name: student_words id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_words ALTER COLUMN id SET DEFAULT nextval('public.student_words_id_seq'::regclass);


--
-- Name: students id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- Name: summernote_uploads id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.summernote_uploads ALTER COLUMN id SET DEFAULT nextval('public.summernote_uploads_id_seq'::regclass);


--
-- Name: task_item_options id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_item_options ALTER COLUMN id SET DEFAULT nextval('public.task_item_options_id_seq'::regclass);


--
-- Name: task_item_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_item_sessions ALTER COLUMN id SET DEFAULT nextval('public.task_item_sessions_id_seq'::regclass);


--
-- Name: task_item_words id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_item_words ALTER COLUMN id SET DEFAULT nextval('public.task_item_words_id_seq'::regclass);


--
-- Name: task_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_items ALTER COLUMN id SET DEFAULT nextval('public.task_items_id_seq'::regclass);


--
-- Name: task_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_sessions ALTER COLUMN id SET DEFAULT nextval('public.task_sessions_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: team_domains id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_domains ALTER COLUMN id SET DEFAULT nextval('public.team_domains_id_seq'::regclass);


--
-- Name: team_followers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_followers ALTER COLUMN id SET DEFAULT nextval('public.team_followers_id_seq'::regclass);


--
-- Name: team_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_groups ALTER COLUMN id SET DEFAULT nextval('public.team_groups_id_seq'::regclass);


--
-- Name: team_invitations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_invitations ALTER COLUMN id SET DEFAULT nextval('public.team_invitations_id_seq'::regclass);


--
-- Name: team_students id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_students ALTER COLUMN id SET DEFAULT nextval('public.team_students_id_seq'::regclass);


--
-- Name: team_users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_users ALTER COLUMN id SET DEFAULT nextval('public.team_users_id_seq'::regclass);


--
-- Name: teams id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams ALTER COLUMN id SET DEFAULT nextval('public.teams_id_seq'::regclass);


--
-- Name: user_languages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_languages ALTER COLUMN id SET DEFAULT nextval('public.user_languages_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: versions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.versions ALTER COLUMN id SET DEFAULT nextval('public.versions_id_seq'::regclass);


--
-- Name: wordplays id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wordplays ALTER COLUMN id SET DEFAULT nextval('public.wordplays_id_seq'::regclass);


--
-- Name: action_text_rich_texts action_text_rich_texts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.action_text_rich_texts
    ADD CONSTRAINT action_text_rich_texts_pkey PRIMARY KEY (id);


--
-- Name: active_storage_attachments active_storage_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_attachments
    ADD CONSTRAINT active_storage_attachments_pkey PRIMARY KEY (id);


--
-- Name: active_storage_blobs active_storage_blobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_blobs
    ADD CONSTRAINT active_storage_blobs_pkey PRIMARY KEY (id);


--
-- Name: active_storage_variant_records active_storage_variant_records_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_variant_records
    ADD CONSTRAINT active_storage_variant_records_pkey PRIMARY KEY (id);


--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: assignments assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT assignments_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: course_sections course_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course_sections
    ADD CONSTRAINT course_sections_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: dictionary_collections dictionary_collections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_collections
    ADD CONSTRAINT dictionary_collections_pkey PRIMARY KEY (id);


--
-- Name: dictionary_crawlers dictionary_crawlers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_crawlers
    ADD CONSTRAINT dictionary_crawlers_pkey PRIMARY KEY (id);


--
-- Name: dictionary_import_words dictionary_import_words_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_import_words
    ADD CONSTRAINT dictionary_import_words_pkey PRIMARY KEY (id);


--
-- Name: dictionary_imports dictionary_imports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_imports
    ADD CONSTRAINT dictionary_imports_pkey PRIMARY KEY (id);


--
-- Name: dictionary_word_collections dictionary_word_collections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_word_collections
    ADD CONSTRAINT dictionary_word_collections_pkey PRIMARY KEY (id);


--
-- Name: dictionary_words dictionary_words_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_words
    ADD CONSTRAINT dictionary_words_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: gameplays gameplays_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gameplays
    ADD CONSTRAINT gameplays_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: lesson_phrases lesson_phrases_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_phrases
    ADD CONSTRAINT lesson_phrases_pkey PRIMARY KEY (id);


--
-- Name: lesson_reviews lesson_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_reviews
    ADD CONSTRAINT lesson_reviews_pkey PRIMARY KEY (id);


--
-- Name: lesson_sessions lesson_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_sessions
    ADD CONSTRAINT lesson_sessions_pkey PRIMARY KEY (id);


--
-- Name: lesson_skills lesson_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_skills
    ADD CONSTRAINT lesson_skills_pkey PRIMARY KEY (id);


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: licenses licenses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT licenses_pkey PRIMARY KEY (id);


--
-- Name: oauth_apps oauth_apps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oauth_apps
    ADD CONSTRAINT oauth_apps_pkey PRIMARY KEY (id);


--
-- Name: pg_search_documents pg_search_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pg_search_documents
    ADD CONSTRAINT pg_search_documents_pkey PRIMARY KEY (id);


--
-- Name: plans plans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (id);


--
-- Name: post_likes post_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_likes
    ADD CONSTRAINT post_likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- Name: rewards rewards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: skills skills_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);


--
-- Name: student_assignments student_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_assignments
    ADD CONSTRAINT student_assignments_pkey PRIMARY KEY (id);


--
-- Name: student_identities student_identities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_identities
    ADD CONSTRAINT student_identities_pkey PRIMARY KEY (id);


--
-- Name: student_item_solutions student_item_solutions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_item_solutions
    ADD CONSTRAINT student_item_solutions_pkey PRIMARY KEY (id);


--
-- Name: student_jwt_deny_list student_jwt_deny_list_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_jwt_deny_list
    ADD CONSTRAINT student_jwt_deny_list_pkey PRIMARY KEY (id);


--
-- Name: student_option_solutions student_option_solutions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_option_solutions
    ADD CONSTRAINT student_option_solutions_pkey PRIMARY KEY (id);


--
-- Name: student_rewards student_rewards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_rewards
    ADD CONSTRAINT student_rewards_pkey PRIMARY KEY (id);


--
-- Name: student_solutions student_solutions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_solutions
    ADD CONSTRAINT student_solutions_pkey PRIMARY KEY (id);


--
-- Name: student_support_languages student_support_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_support_languages
    ADD CONSTRAINT student_support_languages_pkey PRIMARY KEY (id);


--
-- Name: student_target_languages student_target_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_target_languages
    ADD CONSTRAINT student_target_languages_pkey PRIMARY KEY (id);


--
-- Name: student_words student_words_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_words
    ADD CONSTRAINT student_words_pkey PRIMARY KEY (id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- Name: summernote_uploads summernote_uploads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.summernote_uploads
    ADD CONSTRAINT summernote_uploads_pkey PRIMARY KEY (id);


--
-- Name: task_item_options task_item_options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_item_options
    ADD CONSTRAINT task_item_options_pkey PRIMARY KEY (id);


--
-- Name: task_item_sessions task_item_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_item_sessions
    ADD CONSTRAINT task_item_sessions_pkey PRIMARY KEY (id);


--
-- Name: task_item_words task_item_words_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_item_words
    ADD CONSTRAINT task_item_words_pkey PRIMARY KEY (id);


--
-- Name: task_items task_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_items
    ADD CONSTRAINT task_items_pkey PRIMARY KEY (id);


--
-- Name: task_sessions task_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_sessions
    ADD CONSTRAINT task_sessions_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: team_domains team_domains_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_domains
    ADD CONSTRAINT team_domains_pkey PRIMARY KEY (id);


--
-- Name: team_followers team_followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_followers
    ADD CONSTRAINT team_followers_pkey PRIMARY KEY (id);


--
-- Name: team_groups team_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_groups
    ADD CONSTRAINT team_groups_pkey PRIMARY KEY (id);


--
-- Name: team_invitations team_invitations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_invitations
    ADD CONSTRAINT team_invitations_pkey PRIMARY KEY (id);


--
-- Name: team_students team_students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_students
    ADD CONSTRAINT team_students_pkey PRIMARY KEY (id);


--
-- Name: team_users team_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_users
    ADD CONSTRAINT team_users_pkey PRIMARY KEY (id);


--
-- Name: teams teams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT teams_pkey PRIMARY KEY (id);


--
-- Name: user_languages user_languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_languages
    ADD CONSTRAINT user_languages_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: versions versions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.versions
    ADD CONSTRAINT versions_pkey PRIMARY KEY (id);


--
-- Name: wordplays wordplays_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wordplays
    ADD CONSTRAINT wordplays_pkey PRIMARY KEY (id);


--
-- Name: game_type_constraint; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX game_type_constraint ON public.task_items USING btree (task_id, ((context ->> 'game_type'::text))) WHERE ((type)::text = 'TaskItems::WordGames'::text);


--
-- Name: index_action_text_rich_texts_uniqueness; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_action_text_rich_texts_uniqueness ON public.action_text_rich_texts USING btree (record_type, record_id, name);


--
-- Name: index_active_storage_attachments_on_blob_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_active_storage_attachments_on_blob_id ON public.active_storage_attachments USING btree (blob_id);


--
-- Name: index_active_storage_attachments_uniqueness; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_active_storage_attachments_uniqueness ON public.active_storage_attachments USING btree (record_type, record_id, name, blob_id);


--
-- Name: index_active_storage_blobs_on_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_active_storage_blobs_on_key ON public.active_storage_blobs USING btree (key);


--
-- Name: index_active_storage_variant_records_uniqueness; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_active_storage_variant_records_uniqueness ON public.active_storage_variant_records USING btree (blob_id, variation_digest);


--
-- Name: index_activities_on_owner_id_and_owner_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_activities_on_owner_id_and_owner_type ON public.activities USING btree (owner_id, owner_type);


--
-- Name: index_activities_on_owner_type_and_owner_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_activities_on_owner_type_and_owner_id ON public.activities USING btree (owner_type, owner_id);


--
-- Name: index_activities_on_recipient_id_and_recipient_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_activities_on_recipient_id_and_recipient_type ON public.activities USING btree (recipient_id, recipient_type);


--
-- Name: index_activities_on_recipient_type_and_recipient_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_activities_on_recipient_type_and_recipient_id ON public.activities USING btree (recipient_type, recipient_id);


--
-- Name: index_activities_on_trackable_id_and_trackable_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_activities_on_trackable_id_and_trackable_type ON public.activities USING btree (trackable_id, trackable_type);


--
-- Name: index_activities_on_trackable_type_and_trackable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_activities_on_trackable_type_and_trackable_id ON public.activities USING btree (trackable_type, trackable_id);


--
-- Name: index_assignments_on_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_assignments_on_language_id ON public.assignments USING btree (language_id);


--
-- Name: index_assignments_on_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_assignments_on_team_id ON public.assignments USING btree (team_id);


--
-- Name: index_comments_author; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_comments_author ON public.comments USING btree (author_id, author_type);


--
-- Name: index_comments_commentable; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_comments_commentable ON public.comments USING btree (commentable_id, commentable_type);


--
-- Name: index_comments_on_author_type_and_author_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_comments_on_author_type_and_author_id ON public.comments USING btree (author_type, author_id);


--
-- Name: index_comments_on_commentable_type_and_commentable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_comments_on_commentable_type_and_commentable_id ON public.comments USING btree (commentable_type, commentable_id);


--
-- Name: index_course_sections_on_course_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_course_sections_on_course_id ON public.course_sections USING btree (course_id);


--
-- Name: index_courses_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_courses_on_discarded_at ON public.courses USING btree (discarded_at);


--
-- Name: index_courses_on_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_courses_on_language_id ON public.courses USING btree (language_id);


--
-- Name: index_courses_on_language_id_and_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_courses_on_language_id_and_slug ON public.courses USING btree (language_id, slug) WHERE (discarded_at IS NULL);


--
-- Name: index_dictionary_collections_on_name_and_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_dictionary_collections_on_name_and_language_id ON public.dictionary_collections USING btree (name, language_id);


--
-- Name: index_dictionary_import_words_on_dictionary_import_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_dictionary_import_words_on_dictionary_import_id ON public.dictionary_import_words USING btree (dictionary_import_id);


--
-- Name: index_dictionary_import_words_on_dictionary_word_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_dictionary_import_words_on_dictionary_word_id ON public.dictionary_import_words USING btree (dictionary_word_id);


--
-- Name: index_dictionary_imports_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_dictionary_imports_on_user_id ON public.dictionary_imports USING btree (user_id);


--
-- Name: index_dictionary_word_collections_on_dictionary_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_dictionary_word_collections_on_dictionary_collection_id ON public.dictionary_word_collections USING btree (dictionary_collection_id);


--
-- Name: index_dictionary_word_collections_on_dictionary_word_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_dictionary_word_collections_on_dictionary_word_id ON public.dictionary_word_collections USING btree (dictionary_word_id);


--
-- Name: index_documents_on_assignable_type_and_assignable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_documents_on_assignable_type_and_assignable_id ON public.documents USING btree (assignable_type, assignable_id);


--
-- Name: index_documents_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_documents_on_student_id ON public.documents USING btree (student_id);


--
-- Name: index_documents_on_task_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_documents_on_task_item_id ON public.documents USING btree (task_item_id);


--
-- Name: index_documents_on_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_documents_on_team_id ON public.documents USING btree (team_id);


--
-- Name: index_gameplays_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_gameplays_on_student_id ON public.gameplays USING btree (student_id);


--
-- Name: index_identities_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_identities_on_user_id ON public.identities USING btree (user_id);


--
-- Name: index_import_words_on_import_id_and_word_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_import_words_on_import_id_and_word_id ON public.dictionary_import_words USING btree (dictionary_import_id, dictionary_word_id);


--
-- Name: index_languages_on_code; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_languages_on_code ON public.languages USING btree (code);


--
-- Name: index_lesson_phrases_on_lesson_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_phrases_on_lesson_id ON public.lesson_phrases USING btree (lesson_id);


--
-- Name: index_lesson_phrases_on_phrase_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_phrases_on_phrase_id ON public.lesson_phrases USING btree (phrase_id);


--
-- Name: index_lesson_reviews_on_author_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_reviews_on_author_id ON public.lesson_reviews USING btree (author_id);


--
-- Name: index_lesson_reviews_on_lesson_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_reviews_on_lesson_id ON public.lesson_reviews USING btree (lesson_id);


--
-- Name: index_lesson_sessions_on_current_task_session_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_sessions_on_current_task_session_id ON public.lesson_sessions USING btree (current_task_session_id);


--
-- Name: index_lesson_sessions_on_lesson_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_sessions_on_lesson_id ON public.lesson_sessions USING btree (lesson_id);


--
-- Name: index_lesson_sessions_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_sessions_on_student_id ON public.lesson_sessions USING btree (student_id);


--
-- Name: index_lesson_skills_on_lesson_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_skills_on_lesson_id ON public.lesson_skills USING btree (lesson_id);


--
-- Name: index_lesson_skills_on_skill_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lesson_skills_on_skill_id ON public.lesson_skills USING btree (skill_id);


--
-- Name: index_lessons_on_author_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lessons_on_author_id ON public.lessons USING btree (author_id);


--
-- Name: index_lessons_on_course_section_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lessons_on_course_section_id ON public.lessons USING btree (course_section_id);


--
-- Name: index_lessons_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lessons_on_discarded_at ON public.lessons USING btree (discarded_at);


--
-- Name: index_lessons_on_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lessons_on_language_id ON public.lessons USING btree (language_id);


--
-- Name: index_lessons_on_support_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lessons_on_support_language_id ON public.lessons USING btree (support_language_id);


--
-- Name: index_lessons_on_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_lessons_on_team_id ON public.lessons USING btree (team_id);


--
-- Name: index_licenses_on_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_licenses_on_plan_id ON public.licenses USING btree (plan_id);


--
-- Name: index_licenses_on_team_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_licenses_on_team_student_id ON public.licenses USING btree (team_student_id);


--
-- Name: index_pg_search_documents_on_searchable_type_and_searchable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_pg_search_documents_on_searchable_type_and_searchable_id ON public.pg_search_documents USING btree (searchable_type, searchable_id);


--
-- Name: index_plans_on_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_plans_on_language_id ON public.plans USING btree (language_id);


--
-- Name: index_plans_on_system_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_plans_on_system_name ON public.plans USING btree (system_name);


--
-- Name: index_posts_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_posts_on_discarded_at ON public.posts USING btree (discarded_at);


--
-- Name: index_ratings_on_lesson_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ratings_on_lesson_id ON public.ratings USING btree (lesson_id);


--
-- Name: index_ratings_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_ratings_on_student_id ON public.ratings USING btree (student_id);


--
-- Name: index_rewards_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_rewards_on_discarded_at ON public.rewards USING btree (discarded_at);


--
-- Name: index_rewards_on_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_rewards_on_language_id ON public.rewards USING btree (language_id);


--
-- Name: index_rewards_on_language_id_and_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_rewards_on_language_id_and_name ON public.rewards USING btree (language_id, name) WHERE (discarded_at IS NULL);


--
-- Name: index_student_assignments_on_assignment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_assignments_on_assignment_id ON public.student_assignments USING btree (assignment_id);


--
-- Name: index_student_assignments_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_assignments_on_student_id ON public.student_assignments USING btree (student_id);


--
-- Name: index_student_identities_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_identities_on_student_id ON public.student_identities USING btree (student_id);


--
-- Name: index_student_item_solutions_on_student_solution_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_item_solutions_on_student_solution_id ON public.student_item_solutions USING btree (student_solution_id);


--
-- Name: index_student_item_solutions_on_task_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_item_solutions_on_task_item_id ON public.student_item_solutions USING btree (task_item_id);


--
-- Name: index_student_jwt_deny_list_on_jti; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_student_jwt_deny_list_on_jti ON public.student_jwt_deny_list USING btree (jti);


--
-- Name: index_student_option_solutions_on_student_item_solution_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_option_solutions_on_student_item_solution_id ON public.student_option_solutions USING btree (student_item_solution_id);


--
-- Name: index_student_option_solutions_on_task_item_option_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_option_solutions_on_task_item_option_id ON public.student_option_solutions USING btree (task_item_option_id);


--
-- Name: index_student_rewards_on_reward_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_rewards_on_reward_id ON public.student_rewards USING btree (reward_id);


--
-- Name: index_student_rewards_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_rewards_on_student_id ON public.student_rewards USING btree (student_id);


--
-- Name: index_student_rewards_on_student_id_and_reward_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_student_rewards_on_student_id_and_reward_id ON public.student_rewards USING btree (student_id, reward_id);


--
-- Name: index_student_solutions_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_solutions_on_discarded_at ON public.student_solutions USING btree (discarded_at);


--
-- Name: index_student_support_languages_on_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_support_languages_on_language_id ON public.student_support_languages USING btree (language_id);


--
-- Name: index_student_support_languages_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_support_languages_on_student_id ON public.student_support_languages USING btree (student_id);


--
-- Name: index_student_target_languages_on_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_target_languages_on_language_id ON public.student_target_languages USING btree (language_id);


--
-- Name: index_student_target_languages_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_target_languages_on_student_id ON public.student_target_languages USING btree (student_id);


--
-- Name: index_student_words_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_words_on_student_id ON public.student_words USING btree (student_id);


--
-- Name: index_student_words_on_word_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_student_words_on_word_id ON public.student_words USING btree (word_id);


--
-- Name: index_student_words_on_word_id_and_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_student_words_on_word_id_and_student_id ON public.student_words USING btree (word_id, student_id);


--
-- Name: index_students_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_students_on_discarded_at ON public.students USING btree (discarded_at);


--
-- Name: index_students_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_students_on_email ON public.students USING btree (email);


--
-- Name: index_students_on_native_student_support_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_students_on_native_student_support_language_id ON public.students USING btree (native_student_support_language_id);


--
-- Name: index_students_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_students_on_reset_password_token ON public.students USING btree (reset_password_token);


--
-- Name: index_task_item_options_on_task_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_task_item_options_on_task_item_id ON public.task_item_options USING btree (task_item_id);


--
-- Name: index_task_item_sessions_on_task_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_task_item_sessions_on_task_item_id ON public.task_item_sessions USING btree (task_item_id);


--
-- Name: index_task_item_sessions_on_task_session_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_task_item_sessions_on_task_session_id ON public.task_item_sessions USING btree (task_session_id);


--
-- Name: index_task_item_words_on_task_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_task_item_words_on_task_item_id ON public.task_item_words USING btree (task_item_id);


--
-- Name: index_task_item_words_on_word_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_task_item_words_on_word_id ON public.task_item_words USING btree (word_id);


--
-- Name: index_task_items_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_task_items_on_discarded_at ON public.task_items USING btree (discarded_at);


--
-- Name: index_task_items_on_task_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_task_items_on_task_id ON public.task_items USING btree (task_id);


--
-- Name: index_task_items_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_task_items_on_type ON public.task_items USING btree (type);


--
-- Name: index_task_sessions_on_lesson_session_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_task_sessions_on_lesson_session_id ON public.task_sessions USING btree (lesson_session_id);


--
-- Name: index_task_sessions_on_task_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_task_sessions_on_task_id ON public.task_sessions USING btree (task_id);


--
-- Name: index_task_sessions_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_task_sessions_on_type ON public.task_sessions USING btree (type);


--
-- Name: index_tasks_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_tasks_on_discarded_at ON public.tasks USING btree (discarded_at);


--
-- Name: index_tasks_on_lesson_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_tasks_on_lesson_id ON public.tasks USING btree (lesson_id);


--
-- Name: index_tasks_on_rank; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_tasks_on_rank ON public.tasks USING btree (rank);


--
-- Name: index_tasks_on_snapshot_and_parent_id_and_snapshot_timestamp; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_tasks_on_snapshot_and_parent_id_and_snapshot_timestamp ON public.tasks USING btree (snapshot, parent_id, snapshot_timestamp);


--
-- Name: index_tasks_on_subject; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_tasks_on_subject ON public.tasks USING btree (subject);


--
-- Name: index_tasks_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_tasks_on_type ON public.tasks USING btree (type);


--
-- Name: index_team_domains_on_domain_and_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_team_domains_on_domain_and_team_id ON public.team_domains USING btree (domain, team_id);


--
-- Name: index_team_domains_on_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_domains_on_team_id ON public.team_domains USING btree (team_id);


--
-- Name: index_team_followers_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_followers_on_student_id ON public.team_followers USING btree (student_id);


--
-- Name: index_team_followers_on_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_followers_on_team_id ON public.team_followers USING btree (team_id);


--
-- Name: index_team_followers_on_team_id_and_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_team_followers_on_team_id_and_student_id ON public.team_followers USING btree (team_id, student_id);


--
-- Name: index_team_groups_on_course_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_groups_on_course_id ON public.team_groups USING btree (course_id);


--
-- Name: index_team_groups_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_groups_on_discarded_at ON public.team_groups USING btree (discarded_at);


--
-- Name: index_team_groups_on_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_groups_on_language_id ON public.team_groups USING btree (language_id);


--
-- Name: index_team_groups_on_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_groups_on_team_id ON public.team_groups USING btree (team_id);


--
-- Name: index_team_groups_on_team_id_and_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_team_groups_on_team_id_and_name ON public.team_groups USING btree (team_id, name) WHERE (discarded_at IS NULL);


--
-- Name: index_team_invitations_on_team_domain_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_invitations_on_team_domain_id ON public.team_invitations USING btree (team_domain_id);


--
-- Name: index_team_invitations_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_invitations_on_user_id ON public.team_invitations USING btree (user_id);


--
-- Name: index_team_invitations_on_user_id_and_team_domain_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_team_invitations_on_user_id_and_team_domain_id ON public.team_invitations USING btree (user_id, team_domain_id);


--
-- Name: index_team_students_on_course_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_students_on_course_id ON public.team_students USING btree (course_id);


--
-- Name: index_team_students_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_students_on_discarded_at ON public.team_students USING btree (discarded_at);


--
-- Name: index_team_students_on_order_team_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_students_on_order_team_group_id ON public.team_students USING btree (team_group_id NULLS FIRST);


--
-- Name: index_team_students_on_student_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_students_on_student_id ON public.team_students USING btree (student_id);


--
-- Name: index_team_students_on_student_id_and_team_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_team_students_on_student_id_and_team_group_id ON public.team_students USING btree (student_id, team_group_id);


--
-- Name: index_team_students_on_team_group_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_students_on_team_group_id ON public.team_students USING btree (team_group_id);


--
-- Name: index_team_students_on_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_students_on_team_id ON public.team_students USING btree (team_id);


--
-- Name: index_team_users_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_users_on_discarded_at ON public.team_users USING btree (discarded_at);


--
-- Name: index_team_users_on_team_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_users_on_team_id ON public.team_users USING btree (team_id);


--
-- Name: index_team_users_on_team_id_and_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_team_users_on_team_id_and_user_id ON public.team_users USING btree (team_id, user_id) WHERE (discarded_at IS NULL);


--
-- Name: index_team_users_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_team_users_on_user_id ON public.team_users USING btree (user_id);


--
-- Name: index_teams_on_default_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_teams_on_default_language_id ON public.teams USING btree (default_language_id);


--
-- Name: index_teams_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_teams_on_discarded_at ON public.teams USING btree (discarded_at);


--
-- Name: index_teams_on_owner_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_teams_on_owner_id ON public.teams USING btree (owner_id);


--
-- Name: index_unarchived_team_groups_on_team_id_and_name; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_unarchived_team_groups_on_team_id_and_name ON public.team_groups USING btree (team_id, name) WHERE (archived_at IS NULL);


--
-- Name: index_user_languages_on_language_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_user_languages_on_language_id ON public.user_languages USING btree (language_id);


--
-- Name: index_user_languages_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_user_languages_on_user_id ON public.user_languages USING btree (user_id);


--
-- Name: index_users_on_default_team_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_on_default_team_user_id ON public.users USING btree (default_team_user_id);


--
-- Name: index_users_on_discarded_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_on_discarded_at ON public.users USING btree (discarded_at);


--
-- Name: index_users_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_email ON public.users USING btree (email);


--
-- Name: index_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_reset_password_token ON public.users USING btree (reset_password_token);


--
-- Name: index_versions_on_item_type_and_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_versions_on_item_type_and_item_id ON public.versions USING btree (item_type, item_id);


--
-- Name: index_word_collections_on_word_id_and_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_word_collections_on_word_id_and_collection_id ON public.dictionary_word_collections USING btree (dictionary_word_id, dictionary_collection_id);


--
-- Name: index_wordplays_on_gameplay_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wordplays_on_gameplay_id ON public.wordplays USING btree (gameplay_id);


--
-- Name: index_wordplays_on_word_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wordplays_on_word_id ON public.wordplays USING btree (word_id);


--
-- Name: index_wordplays_on_word_id_and_gameplay_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_wordplays_on_word_id_and_gameplay_id ON public.wordplays USING btree (word_id, gameplay_id);


--
-- Name: lesson_sessions_constraint; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX lesson_sessions_constraint ON public.lesson_sessions USING btree (lesson_id, student_id, status) WHERE (status = 0);


--
-- Name: lessons cc_insert_delete_courses__lessons_count; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER cc_insert_delete_courses__lessons_count AFTER INSERT OR DELETE ON public.lessons FOR EACH ROW EXECUTE PROCEDURE public.cc_course__lessons_count();


--
-- Name: lessons cc_update_courses__lessons_count; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER cc_update_courses__lessons_count AFTER UPDATE OF course_section_id ON public.lessons FOR EACH ROW WHEN ((old.course_section_id IS DISTINCT FROM new.course_section_id)) EXECUTE PROCEDURE public.cc_course__lessons_count();


--
-- Name: team_invitations fk_rails_00c9fd0568; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_invitations
    ADD CONSTRAINT fk_rails_00c9fd0568 FOREIGN KEY (team_domain_id) REFERENCES public.team_domains(id);


--
-- Name: team_followers fk_rails_0413885881; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_followers
    ADD CONSTRAINT fk_rails_0413885881 FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- Name: lesson_sessions fk_rails_134e6ba3da; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_sessions
    ADD CONSTRAINT fk_rails_134e6ba3da FOREIGN KEY (current_task_session_id) REFERENCES public.task_sessions(id);


--
-- Name: task_items fk_rails_148fda918e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_items
    ADD CONSTRAINT fk_rails_148fda918e FOREIGN KEY (task_id) REFERENCES public.tasks(id);


--
-- Name: student_rewards fk_rails_1f39555fe6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_rewards
    ADD CONSTRAINT fk_rails_1f39555fe6 FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: dictionary_import_words fk_rails_279b655911; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_import_words
    ADD CONSTRAINT fk_rails_279b655911 FOREIGN KEY (dictionary_import_id) REFERENCES public.dictionary_imports(id);


--
-- Name: student_rewards fk_rails_2f76d85bcc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_rewards
    ADD CONSTRAINT fk_rails_2f76d85bcc FOREIGN KEY (reward_id) REFERENCES public.rewards(id) ON DELETE CASCADE;


--
-- Name: team_domains fk_rails_31550768a5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_domains
    ADD CONSTRAINT fk_rails_31550768a5 FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- Name: licenses fk_rails_45b262d517; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT fk_rails_45b262d517 FOREIGN KEY (team_student_id) REFERENCES public.team_students(id);


--
-- Name: dictionary_word_collections fk_rails_47f038f0a5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_word_collections
    ADD CONSTRAINT fk_rails_47f038f0a5 FOREIGN KEY (dictionary_word_id) REFERENCES public.dictionary_words(id);


--
-- Name: dictionary_word_collections fk_rails_4a3492dc21; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_word_collections
    ADD CONSTRAINT fk_rails_4a3492dc21 FOREIGN KEY (dictionary_collection_id) REFERENCES public.dictionary_collections(id);


--
-- Name: lessons fk_rails_4cce76aef3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT fk_rails_4cce76aef3 FOREIGN KEY (parent_id) REFERENCES public.lessons(id);


--
-- Name: identities fk_rails_5373344100; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.identities
    ADD CONSTRAINT fk_rails_5373344100 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: documents fk_rails_5385c3d6be; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT fk_rails_5385c3d6be FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- Name: team_students fk_rails_581aae419f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_students
    ADD CONSTRAINT fk_rails_581aae419f FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- Name: rewards fk_rails_59e63a5b0d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT fk_rails_59e63a5b0d FOREIGN KEY (language_id) REFERENCES public.languages(id);


--
-- Name: course_sections fk_rails_616bd9cbd0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course_sections
    ADD CONSTRAINT fk_rails_616bd9cbd0 FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- Name: ratings fk_rails_64a8be6c3b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT fk_rails_64a8be6c3b FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: student_identities fk_rails_6a412cd57a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_identities
    ADD CONSTRAINT fk_rails_6a412cd57a FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: ratings fk_rails_6e6d997ed4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT fk_rails_6e6d997ed4 FOREIGN KEY (lesson_id) REFERENCES public.lessons(id);


--
-- Name: lesson_sessions fk_rails_7219378f6f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_sessions
    ADD CONSTRAINT fk_rails_7219378f6f FOREIGN KEY (lesson_id) REFERENCES public.lessons(id);


--
-- Name: task_sessions fk_rails_725d1e0fa1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_sessions
    ADD CONSTRAINT fk_rails_725d1e0fa1 FOREIGN KEY (task_id) REFERENCES public.tasks(id);


--
-- Name: task_item_options fk_rails_762369f27c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_item_options
    ADD CONSTRAINT fk_rails_762369f27c FOREIGN KEY (task_item_id) REFERENCES public.task_items(id);


--
-- Name: gameplays fk_rails_79c2ede19a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gameplays
    ADD CONSTRAINT fk_rails_79c2ede19a FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: team_followers fk_rails_85433b9d51; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_followers
    ADD CONSTRAINT fk_rails_85433b9d51 FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: documents fk_rails_8709ed5c3b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT fk_rails_8709ed5c3b FOREIGN KEY (task_item_id) REFERENCES public.task_items(id);


--
-- Name: student_item_solutions fk_rails_8d422a2bc0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_item_solutions
    ADD CONSTRAINT fk_rails_8d422a2bc0 FOREIGN KEY (task_item_id) REFERENCES public.task_items(id);


--
-- Name: team_groups fk_rails_8f8ed1b477; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_groups
    ADD CONSTRAINT fk_rails_8f8ed1b477 FOREIGN KEY (language_id) REFERENCES public.languages(id) ON DELETE SET NULL;


--
-- Name: task_sessions fk_rails_8f9ac6c90d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.task_sessions
    ADD CONSTRAINT fk_rails_8f9ac6c90d FOREIGN KEY (lesson_session_id) REFERENCES public.lesson_sessions(id);


--
-- Name: lesson_sessions fk_rails_9451da15da; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_sessions
    ADD CONSTRAINT fk_rails_9451da15da FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: active_storage_variant_records fk_rails_993965df05; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_variant_records
    ADD CONSTRAINT fk_rails_993965df05 FOREIGN KEY (blob_id) REFERENCES public.active_storage_blobs(id);


--
-- Name: student_option_solutions fk_rails_9a7f78d718; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_option_solutions
    ADD CONSTRAINT fk_rails_9a7f78d718 FOREIGN KEY (student_item_solution_id) REFERENCES public.student_item_solutions(id);


--
-- Name: dictionary_imports fk_rails_9f88809055; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_imports
    ADD CONSTRAINT fk_rails_9f88809055 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: team_invitations fk_rails_a31a422ac4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_invitations
    ADD CONSTRAINT fk_rails_a31a422ac4 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: wordplays fk_rails_a6cc381a62; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wordplays
    ADD CONSTRAINT fk_rails_a6cc381a62 FOREIGN KEY (gameplay_id) REFERENCES public.gameplays(id);


--
-- Name: student_assignments fk_rails_a8a6447284; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_assignments
    ADD CONSTRAINT fk_rails_a8a6447284 FOREIGN KEY (assignment_id) REFERENCES public.assignments(id);


--
-- Name: student_assignments fk_rails_aec211a26e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_assignments
    ADD CONSTRAINT fk_rails_aec211a26e FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: licenses fk_rails_be5ad26482; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.licenses
    ADD CONSTRAINT fk_rails_be5ad26482 FOREIGN KEY (plan_id) REFERENCES public.plans(id);


--
-- Name: assignments fk_rails_c143c3c056; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT fk_rails_c143c3c056 FOREIGN KEY (team_id) REFERENCES public.teams(id);


--
-- Name: active_storage_attachments fk_rails_c3b3935057; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_storage_attachments
    ADD CONSTRAINT fk_rails_c3b3935057 FOREIGN KEY (blob_id) REFERENCES public.active_storage_blobs(id);


--
-- Name: student_words fk_rails_c53d9efac8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_words
    ADD CONSTRAINT fk_rails_c53d9efac8 FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: plans fk_rails_c97a062def; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT fk_rails_c97a062def FOREIGN KEY (language_id) REFERENCES public.languages(id);


--
-- Name: courses fk_rails_cb5582d97e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT fk_rails_cb5582d97e FOREIGN KEY (language_id) REFERENCES public.languages(id);


--
-- Name: team_groups fk_rails_cc8ccf1f52; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_groups
    ADD CONSTRAINT fk_rails_cc8ccf1f52 FOREIGN KEY (team_id) REFERENCES public.teams(id) ON DELETE CASCADE;


--
-- Name: teams fk_rails_d1d19ceb5d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teams
    ADD CONSTRAINT fk_rails_d1d19ceb5d FOREIGN KEY (default_language_id) REFERENCES public.languages(id);


--
-- Name: student_option_solutions fk_rails_d42b502b5f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_option_solutions
    ADD CONSTRAINT fk_rails_d42b502b5f FOREIGN KEY (task_item_option_id) REFERENCES public.task_item_options(id);


--
-- Name: documents fk_rails_ee00a59e3a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT fk_rails_ee00a59e3a FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: assignments fk_rails_ee11945f28; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assignments
    ADD CONSTRAINT fk_rails_ee11945f28 FOREIGN KEY (language_id) REFERENCES public.languages(id);


--
-- Name: dictionary_import_words fk_rails_ef339b317b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dictionary_import_words
    ADD CONSTRAINT fk_rails_ef339b317b FOREIGN KEY (dictionary_word_id) REFERENCES public.dictionary_words(id);


--
-- Name: student_item_solutions fk_rails_ef41993bd7; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.student_item_solutions
    ADD CONSTRAINT fk_rails_ef41993bd7 FOREIGN KEY (student_solution_id) REFERENCES public.student_solutions(id);


--
-- Name: team_students fk_rails_f5abc53f2d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_students
    ADD CONSTRAINT fk_rails_f5abc53f2d FOREIGN KEY (student_id) REFERENCES public.students(id);


--
-- Name: team_students fk_rails_fbd32b8971; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.team_students
    ADD CONSTRAINT fk_rails_fbd32b8971 FOREIGN KEY (team_group_id) REFERENCES public.team_groups(id) ON DELETE SET NULL;


--
-- Name: students fk_rails_fec6998daa; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT fk_rails_fec6998daa FOREIGN KEY (active_student_target_language_id) REFERENCES public.student_target_languages(id);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO "schema_migrations" (version) VALUES
('20190730081632'),
('20190730085730'),
('20190730100503'),
('20190730102413'),
('20190730103443'),
('20190730122807'),
('20190730123325'),
('20190730201333'),
('20190807100713'),
('20190813225437'),
('20190815094014'),
('20190830100351'),
('20190902070241'),
('20190903055326'),
('20190903192712'),
('20190906183519'),
('20190909081603'),
('20190909114237'),
('20190912082717'),
('20190913165034'),
('20190926173252'),
('20190926173253'),
('20190930060426'),
('20191010061537'),
('20191016231625'),
('20191119135934'),
('20191219122043'),
('20191224075845'),
('20200104210247'),
('20200104210305'),
('20200107082927'),
('20200129113055'),
('20200401165737'),
('20200403122816'),
('20200407182956'),
('20200408090304'),
('20200408155606'),
('20200408185241'),
('20200408194045'),
('20200416145645'),
('20200420120741'),
('20200420121804'),
('20200424125101'),
('20200428130658'),
('20200430071732'),
('20200506062621'),
('20200507123133'),
('20200507123447'),
('20200507151909'),
('20200512132219'),
('20200515161046'),
('20200527123451'),
('20200527161420'),
('20200528101837'),
('20200528132302'),
('20200528152900'),
('20200602074152'),
('20200602090905'),
('20200602091324'),
('20200602095414'),
('20200611053632'),
('20200617153427'),
('20200624191350'),
('20200624191910'),
('20200701131810'),
('20200706122521'),
('20200710042032'),
('20200714185847'),
('20200717122115'),
('20200727050857'),
('20200727185113'),
('20200731000234'),
('20200804120855'),
('20200805182724'),
('20200806081644'),
('20200806151025'),
('20200806152416'),
('20200806152700'),
('20200811153527'),
('20200811174408'),
('20200812174925'),
('20200813154129'),
('20200813165112'),
('20200814132753'),
('20200818155558'),
('20200825163334'),
('20200825163610'),
('20200827102453'),
('20200901145852'),
('20200901173647'),
('20200902173412'),
('20200903170309'),
('20200904075710'),
('20200904084637'),
('20200908082738'),
('20200908190148'),
('20200908193203'),
('20200908193524'),
('20200910091343'),
('20200910150105'),
('20200910174433'),
('20200913063706'),
('20200916172630'),
('20200917134205'),
('20200917134627'),
('20200921092534'),
('20200921170351'),
('20200923231101'),
('20200924220104'),
('20200928090941'),
('20200929081416'),
('20200929155237'),
('20200929194002'),
('20201005173200'),
('20201005210503'),
('20201005211757'),
('20201005225036'),
('20201006173322'),
('20201006205414'),
('20201007195909'),
('20201008032254'),
('20201009073739'),
('20201012030506'),
('20201012153431'),
('20201013084921'),
('20201013121626'),
('20201014195648'),
('20201015160559'),
('20201015180807'),
('20201021065717'),
('20201021142626'),
('20201022115113'),
('20201022121333'),
('20201027093027'),
('20201027150509'),
('20201103221034'),
('20201104072025'),
('20201104180448'),
('20201108153813'),
('20201110135515'),
('20201112091700'),
('20201118175029'),
('20201118182236'),
('20201118184137'),
('20201119175558'),
('20201120154410'),
('20201125002923'),
('20201125152614'),
('20201125154140'),
('20201127084836'),
('20201128013722'),
('20201130124958'),
('20201130173907'),
('20201201061954'),
('20201204054618'),
('20201204222708'),
('20201205121208'),
('20201208155631'),
('20201215203313'),
('20201216075913'),
('20201218030301'),
('20201221121028'),
('20201228085432'),
('20210104132019'),
('20210104161012'),
('20210104225323'),
('20210105132354'),
('20210106201307'),
('20210112093505'),
('20210113122621'),
('20210116025231'),
('20210122112617'),
('20210125123815'),
('20210125152330'),
('20210125182808'),
('20210126061514'),
('20210126190022'),
('20210126190023'),
('20210131230340');


