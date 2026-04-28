
import AppContainer from "./components/containers/AppContainer";
import Content from "./layout/content/Content";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

function App() {
	
	// const [showSidebar,setShowSiebar] = useState(false)


    return (
            <AppContainer>
            <div className="dark:text-gray-100">
            <Content />
            <Header />
            <Sidebar />
            </div>
            <ToastContainer />
            </AppContainer>
    );
}

export default App;
