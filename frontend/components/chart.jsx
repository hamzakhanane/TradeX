import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';



export const Chart = ({data, openingPrice, change, percent_change}) =>{
    let stroke_color;
    if(change<0){
        stroke_color = "#FF4500";
    }
    else{
        stroke_color = "#21CE99";
    }
    function ChangePrice({ active, payload}) {
        let sign = "+";
        let pricediff = 0;
        let percentDiff = 0;
     

        if(active===false){
            return (
                <div className="price-container">
                    <span className="current-price">${Number(openingPrice).toLocaleString()}</span>
                    <div className="diff">
                        <span>${Number(change).toLocaleString()}</span>
                        <span>({Number(percent_change).toLocaleString()}%)</span>
                    </div>
                </div>
            );
        }
       
        else if (active) {
           
            pricediff = openingPrice - payload[0].value;
            percentDiff = (openingPrice - payload[0].value) * (1/100);
            if(percentDiff>0){
                sign="+";
            }
            else{
                sign="-";
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

    return(
        

        
        <LineChart width={680} height={311} data={data}>
            <Line connectNulls={true} type="monotone" dataKey="close" dot={false} stroke={stroke_color}/>
            <Tooltip className="tooltip" content={<ChangePrice />} position={{ x: 2, y: -10 }} wrapperStyle={{
                visibility: 'visible',
            }} />
            <XAxis dataKey="date" hide={true} />
            <YAxis domain={["dataMin", "dataMax"]}  hide={true}/>
        </LineChart>
            
    )




}