import { Link } from 'react-router-dom';
import { FaBook, FaDoorOpen } from 'react-icons/fa';
import { useState } from 'react';
import Button from './button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return (
    <header className="bg-primary border-b-[8px] border-secondary text-white p-4">
      <nav className="max-w-7xl w-auto mx-auto px-4">
        {/* Menu Desktop */}
        <ul className="gap-4 hidden md:flex font-semibold text-primary">
          <li className="mr-auto">
            <Link
              to="/"
              className="rounded-lg bg-offwhite flex items-center gap-2 px-4 py-2"
            >
              <span>Home </span>
              <FaBook className="bg-offwhite" size={20} />
            </Link>
          </li>
          <li>
            <Link
              to="new-contact"
              className="rounded-lg bg-offwhite flex items-center gap-2 px-4 py-2"
            >
              Novo Contato
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              className="rounded-lg bg-offwhite flex items-center gap-2 px-4 py-2"
            >
              Contatos
            </Link>
          </li>
          <li>
            <Button
              text="Sair"
              className="!bg-offwhite"
              textClassName="!text-primary"
              onClick={handleLogout}
            />
          </li>
        </ul>

        {/* Menu Mobile */}
        <div className="md:hidden flex items-center justify-between">
          <Link
            to="/home"
            className="rounded-lg font-semibold bg-offwhite flex items-center gap-2 px-4 py-2 text-primary"
          >
            <span>Home </span>
            <FaBook size={20} />
          </Link>
          <button onClick={toggleMenu} className="text-white">
            <span className="text-2xl">&#9776;</span>
          </button>
        </div>

        {isMenuOpen && (
          <ul className="absolute top-20 left-0 right-0 bg-primary text-white py-4 px-6 md:hidden">
            <li onClick={toggleMenu}>
              <Link to="/new-contact" className="block py-2">
                Novo Contato
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Link to="/contact" className="block py-2">
                Contatos
              </Link>
            </li>
            <li onClick={toggleMenu}>
              <Button
                text="Sair"
                onClick={handleLogout}
                className="!bg-transparent !p-0 !py-2 "
                textClassName="!font-normal mr-6"
                icon={FaDoorOpen}
              />
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
