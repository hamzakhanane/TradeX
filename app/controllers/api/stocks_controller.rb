class Api::StocksController < ApplicationController
  

    def show
        @stock = Stock.find(params[:id])
        render :show
    end

    # def index
    #    
    #     @stocks = Stock.search(params[:company_name])
    #     render :index 
    # end

    def search
       
       @stocks = Stock.search_q(params[:q])
       
       render :index
    end
end
