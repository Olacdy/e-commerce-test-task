# frozen_string_literal: true

module Api
  module V1
    module Users
      class RegistrationsController < Devise::RegistrationsController
        include RackSessionsFix

        before_action :configure_permitted_parameters, only: [:create]
        before_action :add_custom_header, only: [:create]

        respond_to :json
        private

        def respond_with(current_user, _opts = {})
          if resource.persisted?
            render json: {
              status: {
                code: 200, message: "Signed up successfully.",
              },
              data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
            }, status: :ok
          else
            render json: {
              status: {message: "User couldn't be created successfully. #{current_user.errors.full_messages.to_sentence}"}
            }, status: :unprocessable_entity
          end
        end

        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
        end

        def add_custom_header
          response.headers["Access-Control-Expose-Headers"] = "Authorization"
        end
      end
    end
  end
end
