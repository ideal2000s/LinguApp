# frozen_string_literal: true

module Teach
  class OptionsController < ApplicationController
    def create
      @option = option_scope.new(option_params)
      respond_to do |f|
        f.js { render (option.save ? :create : :new), locals: { item: item, option: option } }
        f.html do
          option.save
          redirect_to edit_admin_task_path(item.task_id)
        end
      end
    end

    def update
      option.update(option_params)
      respond_to do |f|
        f.html { redirect_back(fallback_location: edit_admin_task_path(@item.task_id)) }
        f.json { respond_with_bip(option, param: :item_option) }
      end
    end

    def destroy
      option.destroy!
      respond_to do |f|
        f.js { render :destroy, locals: { option: option } }
      end
    end

    def toggle_correct
      option.toggle!(:correct)
    end

    private

    def item
      @item ||= TaskItem.find(params[:item_id])
    end

    def option
      @option ||= option_scope.find(params[:id])
    end

    def option_scope
      item.options
    end

    def option_params
      params.require(:item_option).permit(*option_scope.params_schema)
    end
  end
end
