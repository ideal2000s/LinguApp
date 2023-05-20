class AddPriceToPlans < ActiveRecord::Migration[6.0]
  def change
    add_monetize :plans, :price
    add_column :plans, :plan_interval, :integer, null: false, default: 0

    change_column_default :plans, :price_cents, from: 0, to: nil
    change_column_default :plans, :price_currency, from: 'EUR', to: nil
    change_column_default :plans, :plan_interval, from: 0, to: nil
  end
end
