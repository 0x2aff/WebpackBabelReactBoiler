import React from 'react';
import ReactDOM from 'react-dom';

import 'style.scss';

let HelloWorld = () => {
  return <h1>Hello stupid world!</h1>
}

ReactDOM.render(<HelloWorld/>, document.getElementById('root'));