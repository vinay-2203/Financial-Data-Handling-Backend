import { roleAccess } from "../config/roles.js";




export const authorize = (requiredPermission) => {
    return (req, res, next) => {
        const role = req.role;
        const allowedPermission = roleAccess[role];
        if (!allowedPermission || !allowedPermission.includes(requiredPermission)) {
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            });
        }
        next()
    }
}