import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from 'routes/Dashboard'

import AppLayout from 'components/AppLayout'

export const routes = [
  {
    exact: true,
    path: '/',
    component: Dashboard // Page Component
  }
]

export default () => (
  <Switch>
    <AppLayout>
      {routes.map((route, i) => (
        <Route {...route} key={`r-${i}`} />
      ))}
    </AppLayout>
  </Switch>
)
