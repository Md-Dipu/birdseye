import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Pages/Shared/Header/Header';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Authentication/Login/Login';
import Plans from './Pages/Plans/Plans/Plans';
import NotFound from './Pages/NotFound/NotFound';
import Footer from './Pages/Shared/Footer/Footer';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './Pages/Authentication/PrivateRoute/RouteProtector';
import AboutUs from './Pages/AboutUs/AboutUs';
import PlaceOrder from './Pages/PlaceOrder/Container/PlaceOrder';
import Register from './Pages/Authentication/Register/Register';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/plans">
                        <Plans />
                    </Route>
                    <Route path="/plans/:planId">
                        <PlaceOrder />
                    </Route>
                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>
                    <Route path="/about-us">
                        <AboutUs />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
