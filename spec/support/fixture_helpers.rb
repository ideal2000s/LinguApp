# frozen_string_literal: true

module FixtureHelpers
  def fixture_file(name)
    File.open(fixtures_path(name), 'rb')
  end

  def fixtures_path(name)
    Rails.root.join('spec', 'fixtures', 'files', name)
  end
end
