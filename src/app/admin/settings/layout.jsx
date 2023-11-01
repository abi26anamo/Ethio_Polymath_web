import Sidebar from "@/componenets/Sidebar"

const layout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 px-4 py-3">{children}</div>
        </div>
    )
}

export default layout