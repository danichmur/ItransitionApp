Rails.application.routes.draw do

  resources :news do
    collection do
      get :limit_index
    end
  end
  
  resources :tags do
    get :projects
  end
  
  resources :sessions do
    collection do
      put :check
    end
  end
  
  resources :users do
    collection do
      put :confirm_email
    end
  end
  
  resources :projects do
    resources :users do
      collection do
        put :users_on_project
      end
    end
    
    resources :documents
    
    resources :discussions do
      resources :comments
    end
    
    collection do
      put :update
      get :limit_index
    end
    
    resources :tags do
      collection do
        put :tags_on_project
      end
    end
  end
  
end