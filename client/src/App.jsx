import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Pages/Shared/Header/Header';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login';
import Plans from './Pages/Plans/Plans.jsx';
import NotFound from './Pages/NotFound/NotFound';
import Footer from './Pages/Shared/Footer/Footer';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './Pages/Login/PrivateRoute/RouteProtector';
import AddPlan from './Pages/AddPlan/MainForm/AddPlan';
import MyOrders from './Pages/MyOrders/MyOrders/MyOrders';
import ManageAllOrders from './Pages/ManageAllOrders/ManageAllOrders/ManageAllOrders';
import AboutUs from './Pages/AboutUs/AboutUs';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';

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
                    <PrivateRoute path="/plans/:planId">
                        <PlaceOrder />
                    </PrivateRoute>
                    <PrivateRoute path="/my-orders">
                        <MyOrders />
                    </PrivateRoute>
                    <PrivateRoute path="/manage-all-orders">
                        <ManageAllOrders />
                    </PrivateRoute>
                    <PrivateRoute path="/add-new-plan">
                        <AddPlan />
                    </PrivateRoute>
                    <Route path="/about-us">
                        <AboutUs />
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