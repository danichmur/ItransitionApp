require 'securerandom'

class UserMailer < ActionMailer::Base
  
  default from: 'project.manager@email.com'
 
   def confirmation_email(user)
     @user = user
     @secret_code = SecureRandom.urlsafe_base64(10)
     mail(to: @user.email, subject: 'Welcome to My Awesome Site')
   end
end
