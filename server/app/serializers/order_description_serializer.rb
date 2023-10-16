class OrderDescriptionSerializer
  include JSONAPI::Serializer

  set_key_transform :camel_lower

  attributes :id, :quantity

  attribute :item do |object|
    ItemSerializer.new(object.item).serializable_hash[:data][:attributes]
  end
end
