'use client'
import authMiddleware from "@/middleware/authMiddleware";

function AdminDashboard(){
    return(
        <>
        Admin Dashboard
        </>
    )
}
export default authMiddleware() (AdminDashboard);