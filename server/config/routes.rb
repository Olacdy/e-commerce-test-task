Rails.application.routes.draw do
  resources :order_descriptions
  resources :orders
  resources :items
  resources :users
  # devise_for :users, path: 'api/v1/', path_names: {
  #   sign_in: 'login',
  #   sign_out: 'logout',
  #   registration: 'signup'
  # },
  # controllers: {
  #   sessions: 'api/v1/users/sessions',
  #   registrations: 'api/v1/users/registrations'
  # }

  devise_scope :user do
    post 'api/v1/login', to: 'api/v1/users/sessions#create', as: :user_session
    post 'api/v1/signup', to: 'api/v1/users/registrations#create', as: :user_registration
    delete 'api/v1/logout', to: 'api/v1/users/sessions#destroy', as: :destroy_user_session
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  draw :api
end
