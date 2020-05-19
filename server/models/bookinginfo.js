import mongoose from 'mongoose';
import SpotInfo from '../models/spotinfo';

const BookingInfoSchema = new mongoose.Schema({
booking_dt  : {
    type: Date
    },
// bldg_nm: {
//     type: String
//     },
spot_info: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'SpotInfo'
    },
emp_id: {
    type: String
}

})

export default mongoose.model('BookingInfo', BookingInfoSchema,'bookinginfo');