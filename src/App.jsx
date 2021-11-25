import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Header from './Pages/Shared/Header/Header';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login/Login';
import Plans from './Pages/Plans/Plans.jsx';
import NotFound from './Pages/NotFound/NotFound';
import Footer from './Pages/Shared/Footer/Footer';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './Pages/Login/PrivateRoute/RouteProtector';

function App() {
    return (
        <AuthProvider>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <PrivateRoute path="/plans">
                    <Plans />
                </PrivateRoute>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
            <Footer />
        </AuthProvider>
    );
}

export default App;
