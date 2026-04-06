import { totalExpense, totalIncome, AllcategoryExpense, AllcategoryIncome,recentActivity, monthlyTrends, categoryIncome } from "../services/aggregate_service.js"
export const incomeTotal = async (req, res) => {
    try {
        const total = await totalIncome();
        return res.status(200).json({ success: true, message: "Total Income!", data: total })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error!', error: err.message })
    }
}

export const expenseTotal = async (req, res) => {
    try {
        const total = await totalExpense();
        return res.status(200).json({ success: true, message: "Total Expense!", data: total })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error!', error: err.message })
    }
}

export const AllexpenseCategory = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const data = await AllcategoryExpense(page,limit);
        return res.status(200).json({ success: true, message: `Total ${data[0].category} Expense!`, result: data })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error!', error: err.message })
    }
}

export const AllincomeCategory = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const data = await AllcategoryIncome(page,limit);
        return res.status(200).json({ success: true, message: `Total ${data[0].category} Income!`, result: data })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error!', error: err.message })
    }
}

export const expenseCategory = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const category = req.body.category;
        const data = await AllcategoryExpense(category,page,limit);
        return res.status(200).json({ success: true, message: `Total ${data[0].category} Expense!`, result: data })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error!', error: err.message })
    }
}

export const incomeCategory = async (req, res) => {
    try {

        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        const category = req.query.category;
       

        const data = await categoryIncome(category,page,limit);
       
        return res.status(200).json({ success: true, message: `Total Income!`, result: data })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error!', error: err.message })
    }
}

export const activityRecent = async(req,res)=>{
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const data = await recentActivity(page,limit);
        if(data.length === 0){
            return res.status(400).json({success:true, message:'Record not Exists!'})
        }
        return res.status(200).json({success:true,message:'Recent Activity!',result: data});
        
    }
    catch(err)
    {
        return res.status(500).json({success: false,message:'Internal Server Error!',error:err.message});
    }
}

export const netIncome = async(req,res)=>{
    try{
        const netIncome = incomeTotal - expenseTotal;
        return res.status(200).json({success:true,message:'You net Income!',result : netIncome});
    }
    catch(err)
    {
        return res.status(500).json({success:false,message:'Intenal Server Error!',error:err.message});
    }
}

export const trendMonthly = async(req,res)=>{
    try{
        const result = await monthlyTrends();
        return res.status(200).json({success:true,message:'Monthly Trends!',result:result});
    }
    catch(err)
    {
        return res.status(500).json({success:false,message:"Error in trendMonthly!",error:err.message});
    }
}