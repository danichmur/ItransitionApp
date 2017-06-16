class UserMailer < ApplicationMailer
  default from: 'daniil.muraveyko@gmail.com'
 
   def confirmation_email(user)
     p "A"
     @user = user
     mail(to: @user.email, subject: 'Welcome to My Awesome Site')
   end
end
