
import Login from './components/Auth/Login';
import { Provider } from 'react-redux';
import store from './redux/store';
import Filter from './components/Home Page/Filters/Filter';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Filter/>
      </Provider>,sdfhsdfh
    </div>
  );
}

export default App;
