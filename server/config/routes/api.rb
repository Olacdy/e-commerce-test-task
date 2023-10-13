# frozen_string_literal: true

namespace :api do
  namespace :v1 do
    # scope :users, module: :users do
    #   post '/', to: 'registrations#create', as: :user_registration
    # end

    get "/users/me", to: "users#me"
    resources :order_descriptions
    resources :orders
    resources :items
    resources :users
  end
end
