# frozen_string_literal: true

json.extract! plan,
              :language_id,
              :system_name,
              :name_translations,
              :price_cents,
              :price_currency,
              :plan_interval,
              :created_at,
              :updated_at
