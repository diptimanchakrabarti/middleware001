import BookingInfo from '../models/bookinginfo';
import SpotInfo from '../models/spotinfo';
const dateFormat = require('dateformat');



function create(req, res, next) {
  SpotInfo.findOne({ bldg_nm: req.body.bldg_nm, spot_no: req.body.spot_num}).exec()
  .then((spotData) =>{
    BookingInfo.create({
      booking_dt: dateFormat(Date.now(),'yyyy-mm-dd'),
      spot_info: spotData._id,
      emp_id: req.body.emp_id})
  }, (e) => next(e))
  .then((savedBooking) => {
      return res.json({'statusCode': 200,'message': 'Spot Booked'});
  }, (e) => next(e));
  }

function get(req,res, next){

  SpotInfo
  // .find({})
  .aggregate([
    {$lookup: {from: 'bookinginfo',localField: '_id',foreignField: 'spot_info', as: 'booking_dtls'}}
    ,{$match:{'booking_dtls': []}}
    ,{$project: {booking_dtls: 0, _id: 0}}
    ])
  .exec()
  .then((spotDtls) => {
    return res.json({'statusCode': 200, 'data': spotDtls})
  },(e) => next(e));

  }

export default {create,get};
