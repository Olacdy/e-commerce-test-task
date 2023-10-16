class ItemSerializer
  include JSONAPI::Serializer

  set_key_transform :camel_lower

  attributes :id, :name, :description, :price
end
