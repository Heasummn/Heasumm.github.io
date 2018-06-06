import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import 'components/styles/App.scss';

import * as routes from 'routes';
import asyncComponent from '../containers/AsyncComponent';
const AsyncNavigation = asyncComponent(() => import('containers/Navigation'));
const AsyncPostsList = asyncComponent(() => import('containers/PostsList'));
const AsyncBlogPost = asyncComponent(() => import('containers/BlogPost'));
const AsyncLogIn = asyncComponent(() => import('containers/LogIn'));
const AsyncLogOut = asyncComponent(() => import('containers/LogOut'))
const AsyncAddPostContainer = asyncComponent(() => import('containers/AddPostContainer'))

const App = () => {
  return(
    <HashRouter>
<div>
      <AsyncNavigation />
      <Route exact path={routes.HOME} component={() => <AsyncPostsList />}/>
      <Route path={routes.BLOG + '/:slug'} component={AsyncBlogPost} />
      <Route exact path={routes.LOGIN} component={() => <AsyncLogIn />} />
      <Route exact path={routes.LOGOUT} component={() => <AsyncLogOut />} />
      <Route exact path={routes.ADD_POST} component={() => <AsyncAddPostContainer />} />
</div>
    </HashRouter>
  );
}

export default App;
