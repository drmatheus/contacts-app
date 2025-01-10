import RouterConfig from './router';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <ToastContainer position="bottom-center" />
      <RouterConfig />
    </Router>
  );
}

export default App;
