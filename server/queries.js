require('dotenv').config();

const {
  User,
  Trip,
  TripUser,
  TripPreferences,
  TripPhoto,
  TripProposal,
  TripItinerary,
  TripProposalVotes,
  Destinations,
  SplitItem,
  SplitOwedPayment
} = require('./db.js');

// create a user
const createUser = async (req, res) => {
  console.log('Data from post:', req.body);
  const user = await User.create(req.body);
  res.send(user);
};

// get user

// destinations - dummy data

const addDestinations = () => {
  Destinations.create({});
};

// add preferences
// need to come back and find where trip_id is = correct trip_id
const addPreferences = (req, res) => {
  TripPreferences.findOne({ where: { user_id: req.user_id } }).then((obj) => {
    if (obj) {
      obj.update(req);
    } else {
      TripPreferences.create(req);
    }
  });
};

const addSplit = async (req, res) => {
  const {
    purchaser_id, description, price, trip_id,
  } = req;
  const item = await SplitItem.create({ purchaser_id, description, price });
  let users = await TripUser.findAll({ where: { trip_id, user_id: { [Op.ne]: purchaser_id } }, raw: true });
  const amount = price / (users.length + 1);
  users.map((user) => SplitOwedPayment.create({
    ower_id: user.user_id, recipient_id: purchaser_id, amount, trip_id, item_id: item.id,
  }));
  // await Promise.all(users)
  // console.log('the item', item.id);
};

const getSplit = async (trip_id, res) => {
  let items = await SplitItem.findAll({ where: { trip_id }, raw: true });
  res.send(items);
}
module.exports = {
  createUser,
  addDestinations,
  addPreferences,
  addSplit,
  getSplit
};
