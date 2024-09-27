/* eslint-disable react/prop-types */


import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar/>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2024 Facebook Clone</p>
      </footer>
    </div>
  );
};

export default MainLayout;
