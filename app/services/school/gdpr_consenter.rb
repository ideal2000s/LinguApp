# frozen_string_literal: true

module School
  class GdprConsenter < Micro::Case
    attributes :team, :url

    def call!
      pdf = ::Converters::URLToPDF.new(url).call
      tmpfile = Tempfile.new(%W[#{team.name}_GDPR_agreement .pdf])
      File.open(tmpfile, 'wb') do |tmp|
        tmp << pdf
      end
      team.update(gdpr_consent_at: Time.zone.now, gdpr_agreement: tmpfile)
      Success()
    end
  end
end
