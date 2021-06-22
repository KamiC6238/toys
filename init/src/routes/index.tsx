import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { HOME, CAROUSEL, GET_BOUNDING_CLIENT_RECT_LAZYLOAD, INTERSECTION_OBSERVER_LAZYLOAD } from '../common'
import { CarouselDemo, GetBoundingClientRectDemo, IntersectionObserverLazyload, HomePage } from '../pages'

export const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path={HOME} component={HomePage} />
        <Route path={CAROUSEL} component={CarouselDemo} />
        <Route path={GET_BOUNDING_CLIENT_RECT_LAZYLOAD} component={GetBoundingClientRectDemo} />
        <Route path={INTERSECTION_OBSERVER_LAZYLOAD} component={IntersectionObserverLazyload} />
        <Redirect to={HOME} />
      </Switch>
    </Router>
  )
}