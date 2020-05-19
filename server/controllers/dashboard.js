import BookingInfo from '../models/bookinginfo';
import SpotInfo from '../models/spotinfo';
const dateFormat = require('dateformat');


function get(req,res, next){
  SpotInfo.distinct('bldg_nm')
  .exec()
  .then((bldgData) => {
    return res.json({'statusCode': '200','data': bldgData})
  }, (e) => next(e));
}

function dash_count(req,res,next){
  // let promise = new Promise(function(resolve, reject) {
  //   spotData = SpotInfo.aggregate([{$lookup: {from: 'spotinfo',localField: 'spot_info',foreignField: '_id', as: 'spot_dtls'}}, {$match: {'spot_dtls.bldg_nm': 'IBM BCS'}}, {$count: 'occupied'}]).exec();
  //   bookingData = BookingInfo.aggregate([{$match: {bldg_nm: 'IBM BCS'}},{$count: "occupied"}]).exec();
  //   return finalObj = bookingData.map(x => Object.assign(x, spotData.find(y => y.id == x.id)));
  // });
  // promise.then((finalObj) => {
  // SpotInfo.aggregate([{$match: {bldg_nm: 'IBM BCS'}},{$unwind: '$spot_no'},{$count: "total"}]).exec()
  SpotInfo.aggregate([
    {$match : {"bldg_nm" : {$eq: req.body.bldg_nm}}}
    ,{$lookup: {from: "bookinginfo",localField: "_id",foreignField: "spot_info", as: "booking_info"}}
    ,{ "$facet": {
        "empty": [
        {$match : { 'booking_info._id':{ $exists: false }}}
        ,{$group : { _id : "$_id"}}
        ]
        ,
        "occupied": [
        {$match : { 'booking_info._id':{ $exists: true }}}
        ,{$group : { _id : "$_id"}}
        ]
    }}
    ,{"$facet": {
        "Empty": [
        {$project: {count:{$size: "$empty"}}}
        ],
        "Occupied": [
        {$project: {count:{$size: "$occupied"}}}
        ]
    }}
    ,{$unwind: { path: '$Empty'}}
    ,{$unwind: { path: "$Occupied"}}
    ])
  .exec()
  .then((finalObj) => {
    return res.json({'statusCode': '200','data': finalObj})
  }, (e) => next(e));
    
  }

export default {get,dash_count};
