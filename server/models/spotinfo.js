import mongoose from 'mongoose';

const SpotInfoSchema = new mongoose.Schema({
  bldg_nm : {
    type: String
    },
  spot_no: {
    type: String
    }

});

export default mongoose.model('SpotInfo', SpotInfoSchema,'spotinfo');
