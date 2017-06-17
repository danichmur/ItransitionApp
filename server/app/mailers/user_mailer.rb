require 'securerandom'

class UserMailer < ActionMailer::Base
  
  default from: 'supperprojectmanager@gmail.com'
 
  def confirmation_email(user)
    @user = user
    $email_code = SecureRandom.urlsafe_base64(10)
    mail(to: @user.email, subject: 'Welcome to Project Manager')
  end
end
