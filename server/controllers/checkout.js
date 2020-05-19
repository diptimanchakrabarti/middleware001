import BookingInfo from '../models/bookinginfo';
const dateFormat = require('dateformat');


function listById(req, res, next, empId) {
    res.set("Content-Type", "application/json");
    // BookingInfo.find({emp_id: empId, booking_dt: dateFormat(Date.now(),'yyyy-mm-dd')}).populate('spot_info')
    BookingInfo.find({emp_id: empId}).populate('spot_info')
      .exec()
      .then((bookinginfo) => res.send(JSON.stringify(bookinginfo))
        , (e) => next(e)
        );
  }


  function doCheckOut(req, res, next) {
    
    // delData = BookingInfo.find({emp_id: empId, book_dt: Date.now()});
    // BookingInfo.remove({_id: delData._id})
    console.log(req.body);
    BookingInfo.deleteOne({
      _id: req.body.doc_id
  })
  .then((savedBooking) => {
      return res.json({'statusCode':200, 'message': 'Check Out Complete'});
  }, (e) => next(e));
  }

  function get(req,res, next){
    return res.json({'status': 'All OK'})
  }

export default {listById,doCheckOut,get};
