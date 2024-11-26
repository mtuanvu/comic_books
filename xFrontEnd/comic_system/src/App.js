import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import ComicBooksList from './components/ComicBooks/ComicBooksList';
import ComicBookForm from './components/ComicBooks/ComicBookForm';
import CustomerForm from './components/Customers/CustomerForm';
import RentBooksForm from './components/Rentals/RentBooksForm';
import RentalReport from './components/Rentals/RentalReport';
import UpdateComicBook from './components/ComicBooks/UpdateComicBook';


const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Comic Books</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/add-comic-book">Add Comic Book</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/customer-register">Register Customer</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/rent-books">Rent Books</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/rental-report">Rental Report</Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/" element={<ComicBooksList />} />
              <Route path="/add-comic-book" element={<ComicBookForm />} />
              <Route path="/customer-register" element={<CustomerForm />} />
              <Route path="/rent-books" element={<RentBooksForm />} />
              <Route path="/rental-report" element={<RentalReport />} />
              <Route path="/update-comic-book/:comicBookID" element={<UpdateComicBook />} /> 
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
