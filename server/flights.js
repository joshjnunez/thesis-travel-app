const Amadeus = require('amadeus');
const { API_KEY, API_SECRET } = require('../config');

let flightData;
let dictionary;
const array = [];
const getFlightsInfo = async () => {
  // input: object with trip ID, destination
  // output: array of objects - flight info
  // array of objects - destinations: airport codes

  const amadeus = new Amadeus({
    clientId: API_KEY,
    clientSecret: API_SECRET,
  });

  await amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: 'MSY',
      destinationLocationCode: 'LAX',
      departureDate: '2020-09-20',
      returnDate: '2020-09-28',
      adults: '1',
      max: '5',
    })
    .then((response) => {
      // console.info(response.data);
      flightData = response.data;
      dictionary = response.result.dictionaries;
      console.info(dictionary, 'FIRST DICTIONRY!!!');
    })
    .then(() => {
      console.info(dictionary, 'dictionary!!!!!!!');
      const price = flightData.map((flight) => flight.price.grandTotal);
      // console.info(dictionary, 'dictionary!!!!!!!');
      // let carrier;
      // for (const key in dictionary.carriers) {
      //   carrier = dictionary.carriers[key];
      // }
      // console.info(carrier, 'CARRIER');
      const carrier = ['Spirit', 'Southwest', 'Delta', 'United', 'JetBlue'];
      let result;
      for (let i = 0; i < price.length; i += 1) {
        const random = Math.floor(Math.random() * carrier.length);
        result = { price: price[i], airline: carrier[random] };
        array.push(result);
      }
      // let arr = [];
      // for (let i = 0; i < flightData.length; i++) {
      //   arr.push(flightData[i].itineraries);
      // }
      // // let itineraries = flightData.forEach((flight) => {
      // //   return flight.itineraries;
      // // });

      // console.info('itineraries:', arr.flat());
      // let flightsStatus = [];
      // for (let i = 0; i < itineraries.length; i++) {
      //   for (let j = 0; j < itineraries[i].segments.length; j++) {
      //     flightsStatus.push(itineraries[i].segments[j]);
      //   }
      // }

      // console.info('depart:', flightsStatus);
      // // console.log('arrive:', arrive);

      // for (let i = 0; i < flightsStatus.length; i++) {
      //   resultObj.push({
      //     airline: flightsStatus[i].operating.carrierCode,
      //     departure: flightsStatus[i].departure,
      //     arrival: flightsStatus[i].arrival,
      //   });
      // }

      // .get(
      //     'https://test.api.amadeus.com/v2/shopping/flight-offers',

      //     {
      //       params: {
      //         access_token: '9BAnvWXyjKuZFgOJC2SmYceUsuTb',
      //         client_id: 'rfNXlbNx2n1u9N5eSINqsFoSrTRrIUmL',
      //         client_secret: 'r9HEL895nhlLQSdC',
      //         originLocationCode: 'MSY',
      //         destinationLocationCode: 'LAX',
      //         departureDate: '2020-09-28',
      //         returnDate: '2020-09-28',
      //         adults: '1',
      //         max: '5',
      //       },
      //     },
      //     (req, res) => {},
      //   );
      // get flight info:
      // axios call to API for flight info
      // origin, destination, dates

      // axios call to API for airline look up

      // convert EUR to USD

      // create object with Airline & Price

      // return array of results
      // return array;
    })
    .catch((err) => console.warn(err));

  return array;
};

module.exports = {
  getFlightsInfo,
};
