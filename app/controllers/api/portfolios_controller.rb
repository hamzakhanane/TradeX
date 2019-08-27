class Api::PortfoliosController < ApplicationController

    def show
        @portfolio = Portfolio.find(params[:id])
        render :show 

    end


    def index
        
        @portfolios = Portfolio.get_num_stock(params[:user_id])
       
        render :index
    end


    def create
        
        # debugger
        @portfolio = Portfolio.new(portfolio_params)
        @portfolio.user_id = current_user.id
        if @portfolio.save
            render :show
        else
            render json: @portfolio.errors.full_messages,  status: 422
        end
    end

    def edit
         @portfolio = Portfolio.find(params[:id])
        redirect_to api_user_url(@portfolio.user_id) unless @portfolio.user_id = current_user.id
    end

    def update
        @portfolio = Portfolio.find(params[:id])
        if @portfolio.update(portfolio_params) 
            redirect_to api_user_url(@portfolio.user_id) unless @portfolio.user_id = current_user.id
        else 
            render json: portfolio.errors.full_messages, status: 422 
        end 

    end

    private

    def portfolio_params
        params.require(:portfolio).permit(:stock_id, :num_stocks)
    end
end