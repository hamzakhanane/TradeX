class Api::StocksController < ApplicationController
  

    def show
        @stock = Stock.find(params[:id])
        render :show
    end

    def index
        @stocks = Stock.all
        render :index 
    end



end