class Api::UsersController < ApplicationController
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(users_params)
    @user.buying_power = 5000
    if @user.save
      login!(@user)
      render "api/users/show"
    else
      
      render json: @user.errors.full_messages, status: 422
    end
  end


  


  def edit
    @user = User.find(params[:id])

  end

  def update
    @user = User.find(params[:id])
    if @user.update(users_params)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def users_params
    params.require(:user).permit(:username, :password, :first_name, :last_name, :buying_power)
  end
end