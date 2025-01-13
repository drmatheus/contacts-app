import RouterConfig from './router';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
// import { GoogleMapsProvider } from './utils/loadGoogleMapsScript';

function App() {
  return (
    <Router>
      {/* <GoogleMapsProvider> */}
      {/* <LoadGoogleMapsScript /> */}
      <ToastContainer position="bottom-center" />
      <RouterConfig />
      {/* </GoogleMapsProvider> */}
    </Router>
  );
}

export default App;
