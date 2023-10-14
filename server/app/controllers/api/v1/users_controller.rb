module Api
  module V1
    class UsersController < ApiController
      before_action :set_user, only: %i[ update destroy ]

      def me
        @current_user = current_user

        if @current_user
          render json: UserSerializer.new(@current_user).serializable_hash[:data][:attributes]
        else
          render status: :unauthorized
        end
      end

      # GET /users
      def index
        @current_user = current_user

        if @current_user
          if @current_user.role == "admin"
            @users = User.all

            render json: UserSerializer.new(@users).serializable_hash[:data].map { |item| item[:attributes] }
          else
            render status: :unauthorized
          end
        else
          render status: :unauthorized
        end
      end

      # PATCH/PUT /users/1
      def update
        @current_user = current_user

        if @current_user
          if @current_user.role == "admin" or @current_user.id.to_s == params[:id]
            if @user.update(user_params)
              render json: UserSerializer.new(@user).serializable_hash[:data][:attributes]
            else
              render json: @user.errors, status: :unprocessable_entity
            end
          else
            render status: :unauthorized
          end
        else
          render status: :unauthorized
        end
      end

      # DELETE /users/1
      def destroy
        @current_user = current_user

        if @current_user
          if @current_user.role == "admin"
            @user.destroy!
          else
            render status: :unauthorized
          end
        else
          render status: :unauthorized
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_user
          @user = User.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def user_params
          params.require(:user).permit(:first_name, :last_name, :email)
        end
    end
  end
end
