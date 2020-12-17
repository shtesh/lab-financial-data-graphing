const API_URL = 'http://api.coindesk.com/v1/bpi/historical/close.json';

const submitBtn = document.querySelector('#submit');
const startDateInput = document.querySelector('#start');
const endDateInput = document.querySelector('#end');
const currencySelect = document.querySelector('#curr');
const maxEle = document.querySelector('#max');
const minEle = document.querySelector('#min');

// ITERATION 1 - Get data (initial API call when loading the page)
const getInitialAPIData = async () => {
    const response = await axios.get(API_URL);
    const data = response.data.bpi;
    // console.log('data :>> ', data);

    // ITERATION 2
  printTheChart(data);
};
getInitialAPIData();

// ITERATION 2 - Create a chart
const printTheChart = (data, currency) => {
    if(!currency) currency = 'USD';
  
    let ctx = document.getElementById('bitcoin-chart').getContext('2d');
  
    let dates = Object.keys(data);
    let bitcoinValues = Object.values(data);
    let formattedData = {
      labels: dates,
      datasets: [{
        label: `Bitcoin value in ${currency}`,
        data: bitcoinValues,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      }]
    };

    new Chart(ctx, {
        type: 'line',
        data: formattedData
    });

// ITERATION 5 (BONUS) - Max/Min Values
  printMinAndMaxValues(data, currency); 
};

// ITERATION 3 & ITERATION 4 (BONUS) - Dates & currency filters
const getAPIDataWithFilters = async (filters) => {
    const { startDate, endDate, currency } = filters;
  
    const response = await axios.get(`${API_URL}?start=${startDate}&end=${endDate}&currency=${currency}`);
    const data = response.data.bpi;
    
    printTheChart(data, currency);
};

// ITERATION 3 & ITERATION 4 (BONUS) - Event listener on the filters submit button
submitBtn.addEventListener('click', () => {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const currency = currencySelect.value;
  
    if(!startDate || !endDate) {
      alert('you must complete the 2 dates');
      return;
    }
  
    getAPIDataWithFilters({ startDate, endDate, currency });
});

// ITERATION 5 (BONUS) - Max/Min Values
const printMinAndMaxValues = (data, currency) => {
    const bitcoinValues = Object.values(data);
    const minValue = Math.min(...bitcoinValues).toFixed(2);
    const maxValue = Math.max(...bitcoinValues).toFixed(2);
    minEle.innerHTML = `${currency} ${minValue}`;
    maxEle.innerHTML = `${currency} ${maxValue}`;
};




