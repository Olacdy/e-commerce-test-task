module Api
  module V1
    class ItemsController < ApiController
      before_action :set_item, only: %i[ show update destroy ]

      # GET /items
      def index
        @items = Item.all

        render json: ItemSerializer.new(@items).serializable_hash[:data].map { |item| item[:attributes] }
      end

      # GET /items/1
      def show
        render json: ItemSerializer.new(@item).serializable_hash[:data][:attributes]
      end

      # POST /items
      def create
        @current_user = current_user

        if @current_user
          if @current_user.role == "admin"
            @item = Item.new(item_params)

            if @item.save
              render json: ItemSerializer.new(@item).serializable_hash[:data][:attributes], status: :created, location: @item
            else
              render json: @item.errors, status: :unprocessable_entity
            end
          else
            render status: :unauthorized
          end
        else
          render status: :unauthorized
        end
      end

      # PATCH/PUT /items/1
      def update
        @current_user = current_user

        if @current_user
          if @current_user.role == "admin"
            if @item.update(item_params)
              render json: ItemSerializer.new(@item).serializable_hash[:data][:attributes]
            else
              render json: @item.errors, status: :unprocessable_entity
            end
          else
            render status: :unauthorized
          end
        else
          render status: :unauthorized
        end
      end

      # DELETE /items/1
      def destroy
        @current_user = current_user

        if @current_user
          if @current_user.role == "admin"
            @item.destroy!
          else
            render status: :unauthorized
          end
        else
          render status: :unauthorized
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_item
          @item = Item.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def item_params
          params.require(:item).permit(:name, :description, :price)
        end
    end
  end
end
