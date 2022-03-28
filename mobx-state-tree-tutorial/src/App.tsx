import React from 'react';
import './App.css';

// mobx utility
import { Provider } from 'mobx-react';
import { setupRootStore } from './mst/setup';

// components
import EmployerComponent from './components/Employer';

// interfaces
interface Props{

}
interface State{
  rootTree: any
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rootTree: null
    }
  }

  componentDidMount() {
    const {rootTree} = setupRootStore()
    this.setState({rootTree})
  }

  render() {
    // destructure state
    const {rootTree} = this.state

    if(!rootTree) return null

    return (
      <Provider rootTree={rootTree}>
        <EmployerComponent />
      </Provider>
    )
  }
}

export default App;
