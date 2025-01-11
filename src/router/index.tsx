import { Navigate, Route, Routes } from 'react-router-dom';
import HomeLayout from '../pages/home/layout';
import ContactPage from '../pages/home/contact';
import NewContactPage from '../pages/home/new-contact';
import AuthLayout from '../pages/auth/layout';
import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';
import Profile from '../pages/home/profile';

const Router = () => {
  return (
    <Routes>
      <Route path="home" element={<HomeLayout />}>
        <Route path="contact/:contactId" element={<ContactPage />} />
        <Route path="new-contact" element={<NewContactPage />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default Router;
