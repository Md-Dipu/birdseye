import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Header from './Pages/Shared/Header/Header';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login';
import Plans from './Pages/Plans/Plans.jsx';
import NotFound from './Pages/NotFound/NotFound';
import Footer from './Pages/Shared/Footer/Footer';
import AuthProvider from './context/AuthProvider';
import RouteProtector from './Pages/Login/PrivateRoute/RouteProtector';

function App() {
    return (
        <AuthProvider>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/plans" element={<RouteProtector element={<Plans />} from='/plans' />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </AuthProvider>
    );
}

export default App;
