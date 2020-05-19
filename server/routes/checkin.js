import express from 'express';

import checkinCntrl from '../controllers/checkin';

const router = express.Router();

router.route('/')
    .get(checkinCntrl.get)
    .post(checkinCntrl.create)
    .put(checkinCntrl.create)



export default router;