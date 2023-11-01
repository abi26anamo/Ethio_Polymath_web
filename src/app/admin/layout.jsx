import { AdminProvider } from "@/redux/adminProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function AdminLayout({ children }) {
    return (
        <div><AdminProvider>
            {children}
            <ToastContainer
                position="top-center"
                hideProgressBar="true"
                autoClose={1000}
            />
        </AdminProvider></div>
    )
}