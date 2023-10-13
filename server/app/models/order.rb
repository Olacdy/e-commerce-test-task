class Order < ApplicationRecord
  has_many :order_descriptions
  accepts_nested_attributes_for :order_descriptions
  belongs_to :user
end
