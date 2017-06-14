Rails.application.routes.draw do
  #get 'tags/index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 # scope '/api' do
   # get :project, to: 'project#index'
    #get :show, to: 'project#show'
 # end
  
  resources :users, :news, :tags
  
  resources :projects do
    get 'users', to: :users, controller: 'projects'
    get 'tags_on_project', to: :tags, controller: 'tags'
    resources :discussions do
      resources :comments
    end
    
    collection do
      put :update
    end
    
    resources :tags do
      collection do
        put :tags_on_project
      end
    end
  end
  
end