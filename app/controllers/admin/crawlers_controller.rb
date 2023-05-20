# frozen_string_literal: true

module Admin
  class CrawlersController < ApplicationController
    before_action :set_crawler, only: %i[show edit update destroy]

    def index
      @crawlers = ::Dictionary::Crawler.all
    end

    def show; end

    def new
      @crawler = ::Dictionary::Crawler.new
    end

    def edit; end

    def create
      @crawler = ::Dictionary::Crawler.new(crawler_params)
      @crawler.status = :pending
      if @crawler.save
        Admin::Dictionary::CrawlWebsiteJob.perform_later(@crawler.id)
        redirect_to admin_crawlers_url, notice: 'Job was successfully created.'
      else
        render :new
      end
    end

    def update
      respond_to do |format|
        if @crawler.update(crawler_params)
          format.html { redirect_to admin_crawler_path(@crawler), notice: 'Crawler was successfully updated.' }
          format.json { render :show, status: :ok, location: @crawler }
        else
          format.html { render :edit }
          format.json { render json: @crawler.errors, status: :unprocessable_entity }
        end
      end
    end

    def destroy
      @crawler.destroy
      respond_to do |format|
        format.html { redirect_to admin_crawlers_url, notice: 'Crawler was successfully destroyed.' }
        format.json { head :no_content }
      end
    end

    private

    def set_crawler
      @crawler = ::Dictionary::Crawler.find(params[:id])
    end

    def crawler_params
      params.require(:dictionary_crawler).permit(:url, :language)
    end
  end
end
