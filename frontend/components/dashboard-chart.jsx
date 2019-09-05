import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';



export const DashboardChart = ({ data, currentValue, change, percent_change }) => {
    if(currentValue !== 0 && data.length > 0){
        change = currentValue - data[0].current_port_value;
        percent_change = (change/currentValue) * 100;
        // let obj = {};
        // obj["current_port_value"] = currentValue;
        // obj["created_at"] = new Date();
        // data.push(obj);
    
    }
    
    let stroke_color;
    if (change < 0) {
        stroke_color = "#FF4500";
    }
    else {
        stroke_color = "#21CE99";
    }
    function ChangePrice({ active, payload }) {
        let sign = "+";
        let pricediff = 0;
        let percentDiff = 0;
        


        if (active === false) {
            return (
                <div className="price-container">
                    <span className="current-price">${Number(currentValue).toLocaleString()}</span>
                    <div className="diff">
                        <span>${Number(change).toLocaleString()}</span>
                        <span>({Number(percent_change).toLocaleString()}%)</span>
                    </div>
                </div>
            );
        }

        else if (active) {

            pricediff = currentValue - payload[0].value;
            percentDiff = (pricediff / currentValue) * (100);
            if(isNaN(percentDiff)){
                percentDiff=0;
            }
            if (percentDiff >= 0) {
                sign = "+";
            }
            else {
                sign = "-";
            }

            return (
                <div className="price-container" >

                    <span className="current-price">${(Number(payload[0].value.toFixed(2)).toLocaleString())}</span>
                    <div className="diff">
                        <span>{sign}${Number(pricediff.toFixed(2)).toLocaleString()}</span>
                        <span>({Number(percentDiff.toFixed(2)).toLocaleString()}%)</span>
                    </div>
                </div>
            );
        }

        return null;
    }
  

    return ( 



        <LineChart width={680} height={311} data={data}>
            <Line connectNulls={true} type="monotone" dataKey="current_port_value" dot={false} stroke={stroke_color} />
            <Tooltip className="tooltip" content={<ChangePrice />} position={{ x: 2, y: -10 }} wrapperStyle={{
                visibility: 'visible',
            }} />
            <XAxis dataKey="created_at" hide={true} />
            <YAxis domain={["dataMin", "dataMax"]} hide={true} />
        </LineChart>

    )




}