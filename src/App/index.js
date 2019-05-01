import React, { Component} from 'react';
import Welcome from './Welcome'
import AppLayout from './AppLayout'
import AppBar from './components/AppBar'

class App extends Component {
  render() {
    return ( 
    <AppLayout>
      <AppBar/>
      <Welcome/>
    </AppLayout>
    );
  }
}

export default App;