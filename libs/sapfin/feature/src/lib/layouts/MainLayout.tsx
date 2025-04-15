import { SapfinFooter, SapfinHeader } from "@sapfin/components";
import { SapfinHomePage } from "../pages";
import '../assets/sapfin.style.scss';

const MainLayout = () => {
    return (
        <div className="sapfin-home">
            <SapfinHeader />
            <SapfinHomePage />
            <SapfinFooter />
        </div>
    )
}

export default MainLayout;