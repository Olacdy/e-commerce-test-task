module Api
  module V1
    class OrdersController < ApiController
      before_action :set_order, only: %i[ show update destroy ]

      # GET /orders
      def index
        @current_user = current_user

        if @current_user
          if @current_user.role != "admin"
            @orders = Order.where(user_id: @current_user.id)
            render json: OrderSerializer.new(@orders).serializable_hash[:data].map { |item| item[:attributes] }
          else
            @orders = Order.all
            render json: OrderSerializer.new(@orders).serializable_hash[:data].map { |item| item[:attributes] }
          end
        else
          render status: :unauthorized
        end
      end

      # GET /orders/1
      def show
        @order = Order.find_by(id: params[:id])

        if @order
          if current_user.role == "admin" || @order.user_id == current_user.id
            render json: OrderSerializer.new(@order).serializable_hash[:data][:attributes]
          else
            render status: :forbidden
          end
        else
          render status: :not_found
        end
      end

      # POST /orders
      def create
        @current_user = current_user

        if @current_user
          @order = @current_user.orders.build(order_params)

          @order.amount = calculate_order_amount(@order.order_descriptions)

          if @order.save
            render json: OrderSerializer.new(@order).serializable_hash[:data][:attributes], status: :created
          else
            render json: @order.errors, status: :unprocessable_entity
          end
        else
          render status: :unauthorized
        end
      end

      # PATCH/PUT /orders/1
      def update
        @current_user = current_user

        if @current_user
          if @current_user.role == "admin"
            if @order.update(order_params)
              render json: @order
            else
              render json: @order.errors, status: :unprocessable_entity
            end
          else
            render status: :unauthorized
          end
        else
          render status: :unauthorized
        end
      end

      # DELETE /orders/1
      def destroy
        if @order
          @order.order_descriptions.destroy_all

          @order.destroy

          render status: :ok
        else
          render status: :not_found
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_order
          @order = Order.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def order_params
          params.require(:order).permit(
            order_descriptions_attributes: [:item_id, :quantity]
          )
        end

        def calculate_order_amount(order_descriptions)
          total_amount = 0

          order_descriptions.each do |order_description|
            item = Item.find(order_description.item_id)
            total_amount += order_description.quantity * item.price
          end

          total_amount
        end
    end
  end
end
