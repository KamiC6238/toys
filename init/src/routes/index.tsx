import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { CarouselDemo, PhotoWallDemo } from '../pages'

export const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route path={'/carousel'} component={CarouselDemo} />
        <Route path={'/photo-wall'} component={PhotoWallDemo} />
        <Redirect to={'/photo-wall'} />
      </Switch>
    </Router>
  )
}