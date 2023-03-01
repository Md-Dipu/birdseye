import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './pages/Shared/Header';
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Plans from './pages/Plans';
import NotFound from './pages/NotFound';
import Footer from './pages/Shared/Footer';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './pages/Authentication/PrivateRoute';
import AboutUs from './pages/AboutUs';
import PlaceOrder from './pages/PlaceOrder';
import Register from './pages/Authentication/Register';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

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
                    <PrivateRoute path="/settings">
                        <Settings />
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
