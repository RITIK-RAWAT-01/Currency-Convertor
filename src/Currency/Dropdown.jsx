import React from "react";
import { HiOutlineStar } from "react-icons/hi2";

function DropdownCurrencySelector({
    currency,
    currnecies,
    setcurrecy,
    title = ""
}){


    return(
        <>
            <div>
                <label htmlFor={title} className="block text-sm font-medium text-gray-700">{title}</label>


                {/* Currency Dropdown.... */}


                <div className="mt-1 relative">
                    <select value={currency} onChange={(e)=> setcurrecy(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">

                    <hr/>
                    
                        {currnecies?.map((currency) => {
                            return <option value={currency} key={currency}>{currency}</option>
                        })}
                    </select>

                    <button onClick={()=> handleFavotite(currency)} className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5">
                        <HiOutlineStar/>
                    </button>
                </div>
            </div>
        </>
    )
}


export default DropdownCurrencySelector;