class ItemSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :description, :price
end
