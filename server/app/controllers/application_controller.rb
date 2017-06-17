class ApplicationController < ActionController::API
  before_action :check_token

  def check_token
    if !User.find_by(authentication_token: params[:authentication_token])
      head(:unauthorized)
    end
  end
end