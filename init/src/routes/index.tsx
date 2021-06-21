import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { CarouselDemo, PhotoWallDemo, HomePage } from '../pages'

export const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route path={'/carousel'} component={CarouselDemo} />
        <Route path={'/photo-wall'} component={PhotoWallDemo} />
        <Redirect to={'/'} />
      </Switch>
    </Router>
  )
}