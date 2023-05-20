# frozen_string_literal: true

# == Schema Information
#
# Table name: student_solutions
#
#  id            :bigint           not null, primary key
#  solution      :jsonb            not null
#  task_snapshot :jsonb            not null
#  correct       :boolean          default(FALSE)
#  score         :integer
#  discarded_at  :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'rails_helper'

RSpec.describe StudentSolution, type: :model do
  subject(:student_solution) { described_class.new }

  describe 'Model validations' do
    context "when score isn't required" do
      it { is_expected.not_to validate_presence_of(:score) }
    end
  end
end
