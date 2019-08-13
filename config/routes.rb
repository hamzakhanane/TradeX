Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show] do 
      resources :watchlists, only: [:show, :create, :update, :destroy]
      resources :portfolios, only: [:show, :create, :update, :destroy]
      resources :transactions, only: [:show, :create, :update, :destroy]
    end
    resource :session, only: [:create, :destroy]
    resources :stocks, only: [:index, :show] do
      collection do 
        get :search, :action => 'search_post', :as => 'search_post'
        get 'search/:q', :action => 'search', :as => 'search'
      end
    end
  end
end
