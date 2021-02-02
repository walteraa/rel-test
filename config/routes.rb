Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'git#index'

  namespace :api do
    namespace :v1 do
      resources :git_graph, only: [:index, :show], param: :hash
      post 'git_graph/merge/:source_hash/:target_hash', to: 'git_graph#merge'
    end
  end
end
