Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 # scope '/api' do
   # get :project, to: 'project#index'
    #get :show, to: 'project#show'
 # end
  
  resources :projects, :users, :news
# resources :projects do
#    get :search, on: :collection
#  end
end