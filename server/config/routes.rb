Rails.application.routes.draw do
  
  resources :news, :tags
  resources :users do
    collection do
      put :sign_up
    end
  end
  
  resources :projects do
    resources :users do
      collection do
        put :users_on_project
      end
    end

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