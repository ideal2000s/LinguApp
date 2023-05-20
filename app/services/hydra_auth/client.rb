# frozen_string_literal: true

module HydraAuth
  class Client < Wrapper
    FETCH_CLIENT_PATH = 'clients/%s'
    CLIENTS_PATH = 'clients'

    TRANSFORM_PARAMS_KEYS = {
      id: :client_id,
      name: :client_name,
      secret: :client_secret
    }.freeze

    class << self
      def fetch(**args)
        new.fetch(**transformed_params(args))
      end

      def update(**args)
        new.update(**transformed_params(args))
      end

      def destroy(**args)
        new.destroy(**transformed_params(args))
      end

      def fetch_all(**_args)
        new.fetch_all
      end

      def create(**args)
        new.create(**transformed_params(args))
      end

      private

      def transformed_params(**params)
        params.transform_keys { |key| TRANSFORM_PARAMS_KEYS.fetch(key, key) }
      end
    end

    def fetch(client_id:)
      get(FETCH_CLIENT_PATH % client_id).body
    end

    def update(client_id:, **update_params)
      put(FETCH_CLIENT_PATH % client_id) do |req|
        req.body = update_params
      end.body
    end

    def destroy(client_id:)
      delete(FETCH_CLIENT_PATH % client_id).body
    end

    def fetch_all
      get(CLIENTS_PATH).body
    end

    def create(**create_params)
      post(CLIENTS_PATH) do |req|
        req.body = create_params
      end.body
    end
  end
end
