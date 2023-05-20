# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Student rating API', type: :request do
  let(:student) { create(:student) }
  let(:lesson) { create(:lesson) }

  describe 'create rating' do
    subject(:rating_request) { post '/api/ratings', params: params }

    let(:params) do
      {
        rating: {
          lesson_id: lesson.id,
          rate: rate
        }
      }
    end

    let(:rate) { '3' }

    before do
      sign_in(student, scope: :student)
    end

    context 'with valid data' do
      specify 'it returns success result' do
        rating_request
        expect(response).to have_http_status(:ok)
      end

      specify 'it creates rating' do
        expect { rating_request }.to change(Rating, :count).by(1)
      end
    end

    context 'with invalid data' do
      let(:rate) { '6' }
      let(:params) do
        {
          rating: {
            rate: rate
          }
        }
      end

      specify 'it returns error' do
        rating_request
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'update rating' do
    subject(:rating_request) { put "/api/ratings/#{rating.id}", params: params }

    let(:rating) { create(:rating, lesson: lesson, student: student) }

    let(:rate) { '5' }

    let(:params) do
      {
        rating: {
          rate: rate
        }
      }
    end

    before do
      sign_in(student, scope: :student)
      # rating
    end

    context 'with valid data' do
      specify 'it returns success result' do
        rating_request
        expect(response).to have_http_status(:ok)
      end

      specify 'it updates rating' do
        rating_request
        expect(rating.reload.rate).to eq(rate.to_i)
      end
    end

    context 'with invalid data' do
      let(:rate) { '6' }
      let(:params) do
        {
          rating: {
            rate: rate
          }
        }
      end

      specify 'it returns error' do
        rating_request
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
