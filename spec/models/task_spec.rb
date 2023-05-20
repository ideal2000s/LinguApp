# frozen_string_literal: true

# == Schema Information
#
# Table name: tasks
#
#  id                 :bigint           not null, primary key
#  name               :string
#  type               :string           not null
#  introduction       :text
#  complexity         :integer          default("low")
#  performance        :float
#  ordered_solution   :boolean          default(FALSE)
#  discarded_at       :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  context            :jsonb            not null
#  published          :boolean          default(TRUE), not null
#  score_method       :integer          default("fractional"), not null
#  snapshot           :boolean          default(FALSE), not null
#  snapshot_timestamp :datetime
#  parent_id          :integer
#  subject            :integer          default("teach"), not null
#  rank               :integer          default(0)
#  lesson_id          :integer
#  position           :integer
#

require 'rails_helper'

RSpec.describe Task, type: :model do
  subject(:task) { described_class.new }

  describe 'has required service class' do
    %i[Form Phraser SolutionEvaluator TaskSession TaskItemSession].each do |service_class|
      described_class.subclasses.each do |task_class|
        it "#{task_class}::#{service_class}" do
          expect { "#{task_class}::#{service_class}".constantize }.not_to raise_exception
        end
      end
    end
  end
end
