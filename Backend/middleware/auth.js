import jwt from "jsonwebtoken";

// Base auth — verifies JWT and attaches decoded user (id + role) to req.body
const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Please Login Again." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!req.body) req.body = {};  // guard for multipart/form-data requests
        req.body.userId = decoded.id;
        req.body.userRole = decoded.role;
        next();
    } catch (error) {
        console.log("❌ JWT Error:", error.message);
        console.log("🔑 Token received:", token?.substring(0, 30) + "...");
        console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET);
        res.json({ success: false, message: "Invalid token. Please Login Again." });
    }
};

// RBAC — restricts route to one or more specific roles
// Usage: requireRole('owner') or requireRole('owner', 'admin')
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        const role = req.body.userRole;
        if (!role || !allowedRoles.includes(role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. This action requires one of these roles: [${allowedRoles.join(', ')}]`
            });
        }
        next();
    };
};

export { authMiddleware, requireRole };
export default authMiddleware;