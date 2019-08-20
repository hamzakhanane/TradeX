class Api::SessionsController < ApplicationController
  def new
    @user = User.new
  end


  def create
    
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])

    if @user
      login!(@user)
      render "api/users/show"
    else
       render json: ["username/password invalid"], status: 422
    end
  end

  def destroy
    if !current_user
      render json: ["you're not logged in"], status: 404
    else
      logout!
    end
  end


end