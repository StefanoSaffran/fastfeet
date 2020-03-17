import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Delivery from '~/pages/Delivery';
import ManageDelivery from '~/pages/Delivery/ManageDelivery';
import Deliveryman from '~/pages/Deliveryman';
import ManageDeliveryman from '~/pages/Deliveryman/ManageDeliveryman';
import Recipient from '~/pages/Recipient';
import ManageRecipient from '~/pages/Recipient/ManageRecipient';
import Problem from '~/pages/Problem';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={Delivery} isPrivate />
      <Route path="/deliveries/new" component={ManageDelivery} isPrivate />
      <Route path="/deliveries/:id" component={ManageDelivery} isPrivate />

      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route path="/deliveryman/new" component={ManageDeliveryman} isPrivate />
      <Route path="/deliveryman/:id" component={ManageDeliveryman} isPrivate />

      <Route path="/recipients" exact component={Recipient} isPrivate />
      <Route path="/recipients/new" component={ManageRecipient} isPrivate />
      <Route path="/recipients/:id" component={ManageRecipient} isPrivate />

      <Route path="/problems" exact component={Problem} isPrivate />
    </Switch>
  );
};

export default Routes;
