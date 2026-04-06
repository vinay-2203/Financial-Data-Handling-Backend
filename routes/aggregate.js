import express from 'express'
import { authorization } from '../middlewares/auth.js';
import { rolecheckservice } from '../middlewares/role_check.js';
import { authorize } from '../middlewares/authorize.js';
import { Permission } from '../config/roles.js';
import {
    AllexpenseCategory, expenseTotal, incomeTotal, AllincomeCategory,
    expenseCategory, incomeCategory, activityRecent,
    netIncome,
    trendMonthly
} from '../controller/aggregate_controller.js';



const router = express.Router();



const Gaurd = [authorization, rolecheckservice];

router.get('/totalIncome', Gaurd, authorize(Permission.TOTAL_INCOME), incomeTotal)

router.get('/totalExpense', Gaurd, authorize(Permission.TOTAL_EXPENSE), expenseTotal);

router.get('/AllcategoryExpense', Gaurd, authorize(Permission.CATEGORY_EXPENSE), AllexpenseCategory);

router.get('/AllcategoryIncome', Gaurd, authorize(Permission.CATEGORY_INCOME), AllincomeCategory);

router.get('/categoryExpense', Gaurd, authorize(Permission.CATEGORY_EXPENSE), expenseCategory);

router.get('/categoryIncome', Gaurd, authorize(Permission.CATEGORY_INCOME), incomeCategory);

router.get('/recentActivity', Gaurd, authorize(Permission.RECENT_ACTIVITY), activityRecent)

router.get('/netIncome',Gaurd,authorize(Permission.NET_INCOME),netIncome);

router.get('/monthlytrend',Gaurd,authorize(Permission.MONTHLY_TREND),trendMonthly)

export default router;