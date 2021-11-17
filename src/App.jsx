import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Plans from './Pages/Plans/Plans.jsx';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
