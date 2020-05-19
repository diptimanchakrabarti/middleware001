import express from 'express';

import checkoutCntrl from '../controllers/checkout';

const router = express.Router();

router.route('/')
.get(checkoutCntrl.get)
// .put(checkoutCntrl.update)

router.route('/:empId')
    .get(checkoutCntrl.listById)
    router.param('empId', checkoutCntrl.listById);

// router.route('/do-checkout/:docId')
router.route('/do-checkout')
    .post(checkoutCntrl.doCheckOut)
    .put(checkoutCntrl.doCheckOut)
    // router.param('docId', checkoutCntrl.doCheckOut);



export default router;