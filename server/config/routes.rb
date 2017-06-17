Rails.application.routes.draw do

  resources :news, :tags
  
  resources :sessions do
    collection do
      put :check
    end
   end
  
  resources :users do
    collection do
      put :sign_up
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
      collection do
        put :discussions_on_project
      end
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