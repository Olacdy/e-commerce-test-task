class OrderSerializer
  include JSONAPI::Serializer

  set_key_transform :camel_lower

  attributes :id, :created_at, :amount, :order_descriptions, :user_email

  attribute :order_descriptions do |object|
    OrderDescriptionSerializer.new(object.order_descriptions).serializable_hash[:data].map { |item| item[:attributes] }
  end

  attribute :user_email do |object|
    User.where(id: object.user_id).pluck(:email).first
  end
end
