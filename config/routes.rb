Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'git#index'
  get '/graph', to: 'git#index'

  namespace :api do
    namespace :v1 do
      resources :git_graph, only: :index
    end
  end
end
