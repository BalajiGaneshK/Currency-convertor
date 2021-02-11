let conversionRates = {};
let currency1 = "INR";
let currency2 = "USD";

//Fetching Conversion rates data from API

fetch("https://api.exchangeratesapi.io/latest").then(

    response => {
        return response;
    }
       
).then(

    resObj => {
      
        resObj.json().then(

            data => { Object.assign(conversionRates, data.rates); }
        )
            
            
            

    }

).catch(

    error => console.error(error)
)

/*

IMPORTANT NOTE: conversionRates{} have base currency as EUR. 
Each value in the object is the value of 1 EUR in the respective country's currency 

*/
console.log(conversionRates);

convert = (id) => {
    
    
    let fromCurrencyValue = +document.getElementById(id).value;
    let fromCurrency;
    let toCurrency;
    let targetId;
    console.log(fromCurrencyValue);

    if (id == "currency1")
    {
        fromCurrency = currency1;
        toCurrency = currency2;
        targetId="currency2"
        console.log("from :", fromCurrency, "to: ", toCurrency);
    }

    else if(id == "currency2")
    {
        fromCurrency = currency2;
        toCurrency = currency1;
        targetId = "currency1";
        console.log("from :", fromCurrency, "to: ", toCurrency);

    }
    
    let toCurrencyValue = (fromCurrencyValue / conversionRates[fromCurrency]) * conversionRates[toCurrency];
    document.getElementById(targetId).value = toCurrencyValue;
   

}

// 
getCurrency1 = () => {
    
    let selectedFromCurrencyList1 = document.getElementById("currencyList1").value;
    console.log("selected curr1:", selectedFromCurrencyList1);

    document.getElementById("currency1").placeholder = "Enter" + " " + selectedFromCurrencyList1;
    currency1 = selectedFromCurrencyList1;
    convert("currency2");
}

getCurrency2 = () => {
    
    let selectedFromCurrencyList2 = document.getElementById("currencyList2").value;
    console.log("selected curr2:", selectedFromCurrencyList2);

    document.getElementById("currency2").placeholder = "Enter" + " " + selectedFromCurrencyList2;
    currency2 = selectedFromCurrencyList2;
    convert("currency1");
}




