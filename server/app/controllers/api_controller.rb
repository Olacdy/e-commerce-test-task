class ApiController < ApplicationController
  # Set response type
  respond_to :json

  private

   # Helper method to access the current user from the token
   def current_user
    if request.headers['Authorization'].present?
      jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last,
                               Rails.application.credentials.devise_jwt_secret_key).first
      @current_user = User.find_by(id: jwt_payload['sub'], jti: jwt_payload['jti'])
    end
  end
end
