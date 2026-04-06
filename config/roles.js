export const Permission = {
    CREATE_RECORD: 'create_record',
    DELETE_RECORD: 'delete_record',
    UPDATE_RECORD: 'update_record',
    SHOW_RECORD: 'show_record',
    CREATE_USER: 'create_user',
    CHANGE_ROLE: 'change_role',
    CHANGE_STATUS: 'change_status',
    DELETE_USER: 'delete_user',
    TOTAL_EXPENSE: 'total_expense',
    ALL_CATEGORY_EXPENSE: 'all_category_expense',
    ALL_CATEGORY_INCOME: 'all_category_income',
    TOTAL_INCOME: 'total_income',
    RECENT_ACTIVITY: 'recent_activity',
    CATEGORY_EXPENSE: 'category_expense',
    CATEGORY_INCOME: 'category_income',
    NET_INCOME: 'net_income',
    MONTHLY_TREND: 'monthly_trend',
    ALL_USER : 'all_user'
};
export const roleAccess = {
    admin: [
        Permission.CREATE_RECORD,
        Permission.DELETE_RECORD,
        Permission.UPDATE_RECORD,
        Permission.SHOW_RECORD,
        Permission.CREATE_USER,
        Permission.CHANGE_STATUS,
        Permission.CHANGE_ROLE,
        Permission.DELETE_USER,
        Permission.TOTAL_EXPENSE,
        Permission.ALL_CATEGORY_EXPENSE,
        Permission.ALL_CATEGORY_INCOME,
        Permission.TOTAL_INCOME,
        Permission.RECENT_ACTIVITY,
        Permission.CATEGORY_EXPENSE,
        Permission.CATEGORY_INCOME,
        Permission.NET_INCOME,
        Permission.MONTHLY_TREND,
        Permission.ALL_USER
    ],
    viewer: [
        Permission.RECENT_ACTIVITY,
        Permission.TOTAL_EXPENSE,
        Permission.TOTAL_INCOME,
        Permission.NET_INCOME,
        Permission.MONTHLY_TREND
    ],
    analyst: [
        Permission.SHOW_RECORD,
        Permission.TOTAL_EXPENSE,
        Permission.CATEGORY_EXPENSE,
        Permission.CATEGORY_INCOME,
        Permission.TOTAL_INCOME,
        Permission.RECENT_ACTIVITY,
        Permission.CATEGORY_EXPENSE,
        Permission.CATEGORY_INCOME,
        Permission.NET_INCOME,
        Permission.MONTHLY_TREND
    ]
}