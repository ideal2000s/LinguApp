# frozen_string_literal: true

require 'rails_helper'

module School
  RSpec.describe ImportFileAnalyzer, type: :service do
    subject(:result_analyzer) do
      described_class.analyze(
        file_param: OpenStruct.new({ path: fixture_file('import_students.csv'), original_file_name: 'sample.csv' })
      )
    end

    it 'returns 6 students' do
      expect(result_analyzer[:users].count).to eq(6)
    end

    describe '#extract_language' do
      before do
        @students = result_analyzer[:users]
      end

      it "returns language_data from 'en' code " do
        expect(@students[0]['native_language_data']).to eq('en')
      end

      it "returns language_data from 'English' system_name" do
        expect(@students[4]['native_language_data']).to eq('English')
      end

      it "returns language_data from 'Dansk' name_translation" do
        expect(@students[1]['native_language_data']).to eq('Dansk')
      end
    end
  end
end
