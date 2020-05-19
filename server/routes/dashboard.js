import express from 'express';

import dashboardCntrl from '../controllers/dashboard';

const router = express.Router();

router.route('/')
    .get(dashboardCntrl.get)

router.route('/')
    .post(dashboardCntrl.dash_count)
    .put(dashboardCntrl.dash_count)
    // router.param('bldgNm', dashboardCntrl.dash_count);



export default router;