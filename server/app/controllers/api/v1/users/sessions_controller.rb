# frozen_string_literal: true

module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        include RackSessionsFix

        before_action :add_custom_header, only: [:create]

        respond_to :json
        private

        def respond_with(current_user, _opts = {})
          render json: {
            status: {
              code: 200, message: "Logged in successfully.",
            },
            data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
          }, status: :ok
        end

        def respond_to_on_destroy
          if request.headers["Authorization"].present?
            jwt_payload = JWT.decode(request.headers["Authorization"].split(" ").last, Rails.application.credentials.devise_jwt_secret_key!).first
            current_user = User.find_by(id: jwt_payload["sub"], jti: jwt_payload["jti"])
          end

          if current_user
            render json: {
              status: 200,
              message: "Logged out successfully."
            }, status: :ok
          else
            render json: {
              status: 401,
              message: "Couldn't find an active session."
            }, status: :unauthorized
          end
        end

        def add_custom_header
          response.headers["Access-Control-Expose-Headers"] = "Authorization"
        end
      end
    end
  end
end
