# frozen_string_literal: true

namespace :api do
  namespace :v1 do
    # scope :users, module: :users do
    #   post '/', to: 'registrations#create', as: :user_registration
    # end
    resources :items
  end
end
