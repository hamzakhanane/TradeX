class Api::WatchListsController < ApplicationController

    def show
        @watch_list = WatchList.find(params[:id])
        render :show 
    end


   def create
    @watch_list = WatchList.new(watch_list_params)
    @watch_list.user_id = current_user.id
    if @watch_list.save
      render :show
    else
      render json: @watch_list.errors.full_messages, status: 422
    end
  end

  def edit 
    @watch_list = WatchList.find(params[:id])
    redirect_to api_user_url(@watch_list.user.id) unless @watch_list.user = current_user
    render :edit
  end

  def update
    @watch_list = WatchList.find(params[:id])
    if watch_list.update(watch_list_params) 
      redirect_to api_user_url(@watch_list.user.id)
    else 
      render json: watch_list.errors.full_messages, status: 422 
    end 
  end 



  private
  def watch_list_params
    params.require(:watchlist).permit(:stock.id)
  end

end