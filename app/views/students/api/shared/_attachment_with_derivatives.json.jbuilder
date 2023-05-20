# frozen_string_literal: true

attachment = record.public_send(attachment_name)

if attachment
  record.public_send(:"#{attachment_name}_derivatives").each do |name, derivative|
    json.set!(name, derivative.url)
  end
else
  json.null!
end
