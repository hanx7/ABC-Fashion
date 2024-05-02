import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './pages/homePage';
// @ts-ignore
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import OrderDetails from "./pages/orderDetailsPage";


export const subPath = {
    home: '/',
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
// @ts-ignore
root.render(
    <React.StrictMode>
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path={subPath.home} exact component={OrderDetails} />
                </Switch>
            </BrowserRouter>
        </div>
    </React.StrictMode>,
);