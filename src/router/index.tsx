import { Outlet, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route
        path="home"
        element={
          <>
            <div>Home</div> <Outlet />{' '}
          </>
        }
      >
        <Route path="contact/:contact-id" element={<div>Contact info</div>} />
        <Route path="new-contact" element={<div>New Contact</div>} />
      </Route>
      <Route
        path="auth"
        element={
          <>
            <div>Auth</div> <Outlet />{' '}
          </>
        }
      >
        <Route path="login" element={<div>Login</div>} />
        <Route path="register" element={<div>Register</div>} />
      </Route>
    </Routes>
  );
};

export default Router;
