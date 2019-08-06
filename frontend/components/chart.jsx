import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';



export const Chart = ({data, openingPrice, minClosing, maxClosing, change, percent_change}) =>{
    let stroke_color;
    if(change<0){
        stroke_color = "#FF0000";
    }
    else{
        stroke_color = "#008000";
    }
    function ChangePrice({ active, payload}) {
        let sign = "+";
        let pricediff = 0;
        let percentDiff = 0;
        // debugger

        if(active===false){
            return (
                <div>
                    <span className="current-price">${Number(openingPrice).toLocaleString()}</span>
                    <span>${Number(change).toLocaleString()}</span>
                    <span>{Number(percent_change).toLocaleString()}%</span>
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
                <div>
                    <span className="current-price">${Number(payload[0].value.toFixed(2)).toLocaleString()}</span>
                    <span>{sign}${Number(pricediff.toFixed(2)).toLocaleString()}</span>
                    <span>{Number(percentDiff).toLocaleString()}%</span>
                </div>
            );
        }
    
        return null;
    }

    return(
        

        
        <LineChart width={600} height={300} data={data}>
            <Line connectNulls={true} type="monotone" dataKey="close" dot={false} stroke={stroke_color}/>
            <Tooltip content={<ChangePrice />} position={{ x: -5, y: -15 }} wrapperStyle={{
                visibility: 'visible',
            }} />
            <XAxis dataKey="date" hide={true} />
            <YAxis domain={[minClosing, maxClosing]} hide={true} />
        </LineChart>
            
    )




}