Using Tech Stack:
  1.Mongodb Database -> (I am using this Because , it is ease to use and give fast data retrieval).

  2.Express Backend Framework -> (It provides middlewares, errorhandling , Routehandling etc).

  3.Javascript Object Oriented Programming language -> (to write a backend logic)

  4.Bcrypt Salt -> (it is use to hash the user password for security).

  5.REST API -> (it is easy to write, it is simple to understand, make developement process fast).


routes - that handles end uri points.
       1.aggretate.js - handles all summary related routes like - (total income, total expense, recent activity, netincome, etc.)
       2.authentication.js- handles login functionality.
       3.record.js - handles all record related routes like - (create record , delete record, update record, show records).
       4.user.js  - handles all user related routes like - (create user , delete user, update user role, user status).

middlewares - that authenticate the user , check permission of particular role and role checking.
1. auth middleware - that check user login or not login.
2. authentication middleware - that check what permission defined for particular role.
3. rolecheck - that check what role of user.
      
controller - that handle the route.
1. aggregate_controller - provides (AllexpenseCategory, expenseTotal, incomeTotal,AllincomeCategory,expenseCategory, incomeCategory, activityRecent,netIncome,trendMonthly). these functions.
        Allcontroller is using after authorization,rolecheking,permissioncheck.

        1.AllexpenseCategory - controle this (router.get('/AllcategoryExpense', Gaurd, authorize(Permission.CATEGORY_EXPENSE), AllexpenseCategory)).In this provides the AllCategoryExpense  service result.

        2.expenseTotal - control this (router.get('/totalExpense', Gaurd, authorize(Permission.TOTAL_EXPENSE), expenseTotal)). In this provides the totalExpense service result.

        3.incomeTotal - control this (router.get('/totalIncome', Gaurd, authorize(Permission.TOTAL_INCOME), incomeTotal)). In this provides the totalIncome service result.

        4.AllincomeCategory - control this (router.get('/AllcategoryIncome', Gaurd, authorize(Permission.CATEGORY_INCOME), AllincomeCategory)). In this provides the AllCategoryIncome service result.

        5.expenseCategory - control this (router.post('/categoryExpense', Gaurd, authorize(Permission.CATEGORY_EXPENSE), expenseCategory)). In this provides the total expense amount for particular category.

        6.incomeCategory - control this (router.post('/categoryIncome', Gaurd, authorize(Permission.CATEGORY_INCOME), incomeCategory)). In this provides the total income amount for particular category.

        7.activityRecent - control this (router.get('/recentActivity', Gaurd, authorize(Permission.RECENT_ACTIVITY), activityRecent)). In this provides the result of recentActivity service.

        8.netIncome - control this (router.get('/netIncome',Gaurd,authorize(Permission.NET_INCOME),netIncome)). In this provides difference of totalincome and totalexpense.

        9.trendMonthly - control this (router.get('/monthlytrend',Gaurd,authorize(Permission.MONTHLY_TREND),trendMonthly)). In this provides the result of monthlyTrend service result.


services - That Interact with Database.
        1. aggregate service - provides (totalExpense, totalIncome, AllcategoryExpense,
                                  AllcategoryIncome,recentActivity, monthlyTrends ) these functions.

            1.totalExpense - give only Total Expense Value

            2.totalIncome - give only Total Income Value

             3.AllcategoryExpense - give all total expense categories wise, it provides array of         objects , objects hold the keys like - total expense of particular category and category.

            4.AllcategoryIncome - give all total income categories wise, it provides array of objects , objects hold the keys like - total income of particular category and category.

            5.recentActivity - give 10 recent records

            6.monthlyTrends - give montly income and expense.

        2. login service - first check user exist or not in database , if exist then create token and send to client or if not exist send message User not found.

        3. record service - provides (recordCreate, recordDelete, recordShow, recordUpdate) these functions .
            1. recordCreate - It is used to Create a Record.
            2. recordDelete - It is used to Delete a Record.
            3. recordShow   - It is used to Show all Records.
            4. recordUpdate - It is used to Update the Records.
        
        4. user service - It provides (changerole, userCreate, userDelete, statusUpdate, userExist) these functions.
            1.changerole - It is used to change the role of the existing user.
            2.userCreate - It is used to create the new user.
            3.StatusUpdate - It is used to change the user Statue(active, inactive).
            4.userDelete - It is used to delete the User.
            5.userExist - It is used to check the user exist or not in our database.

validations - It is used to validate data. Zod library is used to validate the data.
    1.login - It is used to validate the incoming data of login request.
    2.record - It is used to validate the incoming data of record document.
    3.user - It is used to validate the incoming data of user.

model - It is used to store the data in mongodb.We mongoose.Schema and mongoose.model.
    1.record - It is used to store the record data in mongodb Database.
    2.user - It is used to store the user data in mongodb Database.

config - It is defined the permissions for particular role.
    1.role - In this we define the permissions for particular role.

* Create your env file and set the variables.
build command - npm install
run command - nodemon index.js

optional features - 
1. JWT authentication
2. Pagination
3. readme or API documentation file
