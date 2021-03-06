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
      const carrier = 'SPIRIT AIRLINES';
      // for (const key in dictionary.carriers) {
      //   carrier = dictionary.carriers[key];
      // }

      let result;
      for (let i = 0; i < price.length; i += 1) {
        result = { price: price[i], airline: carrier };
        array.push(result);
      }

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
