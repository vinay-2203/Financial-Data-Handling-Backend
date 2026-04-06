import { recordmodel } from "../model/record.js"





export const totalIncome = async () => {
    try {
        const total = await recordmodel.aggregate([
            {
                $match: { type: 'income' }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ])
        return total[0]?.total || 0
    }
    catch (err) {
        throw err;
    }
}

export const totalExpense = async () => {
    try {
        const total = await recordmodel.aggregate([
            {
                $match: { type: 'expense' }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ])
        return total[0]?.total || 0
    }
    catch (err) {
        throw err;
    }
}

export const AllcategoryExpense = async (page, limit) => {
    try {
        const skip = (page - 1) * limit;
        const result = await recordmodel.aggregate([
            {
                $match: { type: 'expense' }
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    total: 1
                }
            },
            {
                $sort: { total: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ])
        return result;
    }
    catch (err) {
        throw err;
    }

}

export const AllcategoryIncome = async (page, limit) => {
    try {
        const skip = (page - 1) * limit;
        const result = await recordmodel.aggregate([
            {
                $match: { type: 'income' }
            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    total: 1
                }
            },
            {
                $sort: { total: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }

        ])
        return result;
    }
    catch (err) {
        throw err;
    }
}

export const categoryExpense = async (category, page, limit) => {
    try {
        const skip = (page - 1) * limit;
        const result = await recordmodel.aggregate([
            {
                $match: { type: 'expense', ...(category && { category: category.trim() })  },

            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    total: 1
                }
            },
            {
                $sort: { total: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ])
        if (result.length === 0) {
            return []
        }
        return result;
    }
    catch (err) {
        throw err;
    }

}

export const categoryIncome = async (category, page, limit) => {
    try {
      
        const skip = (page - 1) * limit;
        
        const result = await recordmodel.aggregate([
            {
                $match: { type: 'income', ...(category && { category: category.trim() }) }

            },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    total: 1
                }
            },
            {
                $sort: { total: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ])
        if (result.length === 0) {
            return [];
        }
        return result;
    }
    catch (err) {
        throw err;
    }
}

export const recentActivity = async (page, limit) => {
    try {
        const skip = (page - 1) * limit;
        const result = await recordmodel.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        return result;
    }
    catch (err) {
        throw err;
    }
}

export const monthlyTrends = async () => {
    try {
        const result = await recordmodel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        type: "$type"
                    },
                    total: { $sum: "$amount" }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            {
                $group: {
                    _id: {
                        year: "$_id.year",
                        month: "$_id.month"
                    },
                    data: {
                        $push: {
                            type: "$_id.type",
                            total: "$total"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    data: 1
                }
            }
        ])
        return result;
    }
    catch (err) {
        throw err;
    }
}