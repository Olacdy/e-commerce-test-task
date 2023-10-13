class OrderDescriptionSerializer
  include JSONAPI::Serializer
  attributes :id, :quantity

  attribute :item do |object|
    ItemSerializer.new(object.item).serializable_hash[:data][:attributes]
  end
end
