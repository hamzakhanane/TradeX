class Api::PortfoliorecordsController < ApplicationController

    def show
        @portfolio_record = PortfolioRecord.find(params[:id])
        render :show 

    end


    def index
     
        @portfolio_records = PortfolioRecord.get_user_records(params[:user_id])
        render :index
    end


    def create
        @portfolio_record = PortfolioRecord.new(portfolio_record_params)
        @portfolio_record.user_id = current_user.id
        if @portfolio_record.save
            
            render :show
        else
            render json: @portfolio_record.errors.full_messages,  status: 422
        end
    end


    private
    def portfolio_record_params
        
      params.require(:PortfolioRecord).permit(:current_port_value)
    end


end
