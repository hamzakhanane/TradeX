class Api::TransactionsController < ApplicationController

    def show
        @transaction = Transaction.find(params[:id])
        render :show 
    end

    def create
        debugger
        @transaction = Transaction.new(transaction_params)
        debugger
        @transaction.user_id = current_user.id
        debugger
        if @transaction.save
            debugger
            render :show
        else
            render json: @transaction.errors.full_messages,  status: 422
        end
    end

    

    private

    def transaction_params
        debugger
        params
        params.require(:transaction).permit(:stock_id, :num_stocks,:total_cost)

    end
end