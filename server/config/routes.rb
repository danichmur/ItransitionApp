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
  end
  
end