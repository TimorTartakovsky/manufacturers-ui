import React from 'react';
import { Route, Switch,  Redirect } from 'react-router-dom';
import ManufacturerDetailsPage from './components/ManufacturerDetails';
import ManufacturerListPage from './components/ManufacturersList';
import Layout from './hoc/Layout';
// import './App.css';

function App() {
  return (
      <Layout>
          <Switch>
            <Route path="/manufacturer-list" exact component={ManufacturerListPage} />
            <Route path="/manufacturer-details/:name" exact component={ManufacturerDetailsPage} />
            <Redirect to="/manufacturer-list" />
          </Switch>
      </Layout>
  );
}

export default App;
