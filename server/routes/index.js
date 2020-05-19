import express from 'express';
import checkinRoutes from './checkin';
import checkoutRoutes from './checkout';
import dashboardRoutes from './dashboard';


const router = express.Router();

/** GET /api-status -Check services status */
router.get('/api-status', (req, res) =>
    res.json({
        status: 200
    })
);

router.use('/checkin',checkinRoutes);
router.use('/checkout',checkoutRoutes);
router.use('/dashboard',dashboardRoutes);


export default router;