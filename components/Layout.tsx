import FollowBar from "./Layout/FollowBar";
import Sidebar from "./Layout/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div className="min-h-screen bg-blue-200">
            <div className="grid lg:-order-1 grid-cols-5 lg:grid-cols-4 h-full">
                <Sidebar />
                <div className="-order-1 lg:order-1
                col-span-4 lg:col-span-2 
                border-x-[1px]
                border-neutral-800 pl-2">
                    {children}
                </div>
                <div className="lg:order-2">

                <FollowBar/>
                </div>
                
            </div>

        </div>
    )
}

export default Layout

