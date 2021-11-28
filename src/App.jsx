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
import PlanDetails from './Pages/PlanDetails/PlanDetails';

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
                        <PlanDetails />
                    </Route>
                    <PrivateRoute path="/add-new-plan">
                        <AddPlan />
                    </PrivateRoute>
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
