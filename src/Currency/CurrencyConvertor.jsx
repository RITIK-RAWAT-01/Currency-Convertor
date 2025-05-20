import React, { useEffect, useState } from "react";
import DropdownCurrencySelector from "./Dropdown";
import { HiSwitchHorizontal } from "react-icons/hi";

function CurrencyConvertor(){

    // 'https://api.frankfurter.app/currencies'
    // 'https://api.frankfurter.app/latest?amount=10&from=GBP&to=USD'

    const [amount , setamount] = useState(1)
    const [currencies , setcurrencies] = useState([])

    const [fromcurrency , setfromcurrency] = useState("USD")
    const [tocurrency , settocurrency] = useState("INR")

    const [ConvartedAmount , setConvartedAmount] = useState(null)
    const [Converting , setConverting] = useState(false)

    const FetchCurrencyData = async() =>{
        try {
            let res = await fetch("https://api.frankfurter.app/currencies");
            let val = await res.json()

            setcurrencies(Object.keys(val))

        } catch (error) {
            console.log("Fetching... Error" , error)
        }
    }


    const SwapCurrency = () =>{
        setfromcurrency(tocurrency)
        settocurrency(fromcurrency)
    }

    const ConvertCurrency = async() =>{
        try {
            if(!amount) return
            setConverting(true)

            let res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromcurrency}&to=${tocurrency}`);
            let val = await res.json()

            setConvartedAmount(val.rates[tocurrency] + "" + tocurrency)

        } catch (error) {
            console.log("Fetching... Error" , error)
        }finally{
            Converting(false)
        }
    }

    useEffect(()=>{
        FetchCurrencyData()
    },[])


    return(
        <>
            <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
                <div className="mb-5 text-2xl font-semibold text-gray-700">
                    <h1>Currency Converter</h1>
                </div>


                {/* Dropdown Currency List */}
                

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                    <DropdownCurrencySelector title={"To :"} currency={fromcurrency} setcurrecy={setfromcurrency} currnecies={currencies}/>

                    <div className="flex justify-center -mb-5 sm:mb-0">
                        <button onClick={SwapCurrency} className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"><HiSwitchHorizontal className="text-xl text-gray-700"/></button>
                    </div>

                    <DropdownCurrencySelector title={"From :"} currency={tocurrency} setcurrecy={settocurrency} currnecies={currencies}/>
                </div>


                {/* Input Box.. */}


                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                        Amount :
                    </label>

                    <input type="number" value={amount} onChange={(e) => setamount(e.target.value)} placeholder="Amount" className="w-full p2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"/>
                </div>


                {/* Input Button... */}


                <div className="flex justify-end mt-6">
                    <button onClick={ConvertCurrency} className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none foucs:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${setConverting ? "animate-pulse" : ""}`}>Submit</button>
                </div>


                {/* Converted Amount Message... */}

            
                {ConvartedAmount && (
                    <div className="mt-4 text-lg font-medium text-right text-green-600">
                        Converted Amount : {ConvartedAmount}
                    </div>
                )}
                
            </div>
        </>
    )
}

export default CurrencyConvertor;