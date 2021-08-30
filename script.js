let conversionRates = {};
let currency1 = "INR";
let currency2 = "USD";
let lastUpdatedDate;
let allHistoricData;
let flag = 0;
let ACCESS_KEY = '02d91e97b9cbb8b598c5e284cedeb705';

//Fetching Conversion rates data from API...

fetch('https://bg-forex-api.herokuapp.com/latest').then(

    response => {
        return response;
    }
       
).then(

    resObj => {
      
        resObj.json().then(

            data => {
                Object.assign(conversionRates, data.rates);
                lastUpdatedDate = data.date;
                //console.log(data);
            }
        )
            
            
            

    }

).catch(

    error => console.error(error)
)
/*
//Fetch historical Conversion rates based on input
async function getHistoricalConversionRates(startDate, endDate)
{
    let api_url = "https://api.exchangeratesapi.io/history?start_at=" + startDate + "&end_at=" + endDate;
    let data2 = await fetch(api_url);
    allHistoricData = await data2.json();
     
}

//Get toCurrency value of 1 unit of fromCurrency 
function getInputBasedHistoricData(fromCurrency, toCurrency,allHistoricCoversionRates)
{
    
    let result = {};
    let keys = Object.keys(allHistoricCoversionRates);
    for (let i = 0; i < keys.length; i++)
    {
        let value = allHistoricCoversionRates[i][toCurrency] / allHistoricCoversionRates[i][fromCurrency];
        result[keys[i]] = value;

    }
    return result;

}

getHistoricalConversionRates("2021-02-01", "2021-02-12");
console.log("allHistoricData:", allHistoricData);
let specificHistoricData =  getInputBasedHistoricData(currency1, currency2, allHistoricData.rates);
console.log(specificHistoricData);
*/

/*

IMPORTANT NOTE: conversionRates{} have base currency as EUR. 
Each value in the object is the value of 1 EUR in the respective country's currency 

*/
//console.log(conversionRates);

convert = (id) => {                                             // the id from which user has given input
    
    
    let fromCurrencyValue = +document.getElementById(id).value;  //input value from user
    let fromCurrency;                                            
    let toCurrency;
    let targetId;                                               //The id in which result has to be printed
    console.log(fromCurrencyValue);
    
    //Assigning fromCurrency and toCurrency based on id

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

    //Changing the lastUpdatedDate format
    flag++;
    if (flag === 1)
    {
        let tempDate = lastUpdatedDate.split('-');
        

        switch (tempDate[1])
        {
            case '01': tempDate[1] = 'January';
                break;
            case '02': tempDate[1] = 'February';
                break;
                
            case '03': tempDate[1] = 'March';
                break;
            case '04': tempDate[1] = 'April';
                break;
            case '05': tempDate[1] = 'May';
                break;
            case '06': tempDate[1] = 'June';
                break;
            case '07': tempDate[1] = 'July';
                break;
            case '08': tempDate[1] = 'August';
                break;
            case '09': tempDate[1] = 'September';
                break;
            case '10': tempDate[1] = 'October';
                break;
            case '11': tempDate[1] = 'November';
                break;
            case '12': tempDate[1] = 'December';
                break;
            
                
        }

        lastUpdatedDate = tempDate[1]+ " "+ tempDate[2] + " th " + tempDate[0];
        console.log(lastUpdatedDate);
    } 
    
    //Displaying Last Updated Date info in UI
    document.getElementById("last-updated-info").innerHTML = "Last Updated On "+ lastUpdatedDate;
    
    //Computing toCurrencyValue 
    let toCurrencyValue = (fromCurrencyValue / conversionRates[fromCurrency]) * conversionRates[toCurrency];
    document.getElementById(targetId).value = toCurrencyValue;

    //Displaying the Results in
    document.getElementById("input-data").innerHTML = fromCurrencyValue + `  ` + fromCurrency+ "  equals"    ;
    document.getElementById("output-data").innerHTML =  toCurrencyValue.toFixed(2)+ `  ` + toCurrency  ;


}


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




