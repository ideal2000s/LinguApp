# frozen_string_literal: true

require 'shrine'
aws_keys = %w[S3_BUCKET AWS_REGION AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY]

if Rails.env.development?
  require 'shrine/storage/file_system'
  Shrine.storages = {
    cache: Shrine::Storage::FileSystem.new('public', prefix: 'uploads/cache'),
    store: Shrine::Storage::FileSystem.new('public', prefix: 'uploads')
  }
elsif aws_keys.all? { |key| ENV[key].present? }
  require 'shrine/storage/s3'
  s3_options = {
    bucket: ENV['S3_BUCKET'],
    region: ENV['AWS_REGION'],
    access_key_id: ENV['AWS_ACCESS_KEY_ID'],
    secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
    upload_options: { acl: 'private' }
  }
  Shrine.storages = {
    store: Shrine::Storage::S3.new(prefix: 'uploads', **s3_options),
    cache: Shrine::Storage::S3.new(prefix: 'uploads/cache', **s3_options)
  }

  Shrine.plugin(:url_options, store: { host: ENV['CLOUDFRONT_HOST'] }) if ENV.key?('CLOUDFRONT_HOST')
else
  require 'shrine/storage/memory'
  Shrine.storages = {
    cache: Shrine::Storage::Memory.new,
    store: Shrine::Storage::Memory.new
  }
end

Shrine.plugin(:activerecord)
Shrine.plugin(:cached_attachment_data)
Shrine.plugin(:derivatives, create_on_promote: true)
Shrine.plugin(:determine_mime_type)
Shrine.plugin(:infer_extension)
Shrine.plugin(:remove_attachment)
Shrine.plugin(:restore_cached_data)
Shrine.plugin(:upload_endpoint, url: true)
Shrine.plugin(:validation)
Shrine.plugin(:validation_helpers)
Shrine.plugin(:remote_url, max_size: 20.megabytes)
