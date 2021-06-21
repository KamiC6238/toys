import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { CarouselDemo } from '../pages/carousel'

export const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/carousel'} component={CarouselDemo} />
        <Redirect to={'/carousel'} />
      </Switch>
    </Router>
  )
}