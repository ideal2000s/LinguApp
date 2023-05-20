# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Students::API::SkillsController do
  describe '#index' do
    subject(:response) { get :index, format: :json }

    it { is_expected.to have_http_status(:ok) }
    it { is_expected.to render_template(:index) }
  end
end
