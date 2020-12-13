import React from 'react';
import loggify from '../loggify-start';

function App() {
  return <div>Hello</div>;
}

App.displayName = 'App';

export default loggify(App);
