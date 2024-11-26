import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // Dùng để chuyển hướng đến trang update

const ComicBooksList = () => {
  const [comicBooks, setComicBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook để điều hướng trang

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5179/api/comic-books/all')
      .then(response => {
        setComicBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the comic books:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = (comicBookID) => {
    if (!comicBookID) {
      message.error('Invalid comic book ID.');
      return;
    }

    axios.delete(`http://localhost:5179/api/comic-books/delete/${comicBookID}`)
      .then(() => {
        setComicBooks(comicBooks.filter(book => book.comicBookID !== comicBookID));
        message.success('Comic book deleted successfully');
      })
      .catch(error => {
        console.error('There was an error deleting the comic book:', error);
        message.error('Error deleting comic book');
      });
  };

  const handleUpdate = (comicBookID) => {
    navigate(`/update-comic-book/${comicBookID}`);  // Điều hướng đến trang update, có thể dùng modal nếu cần
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'comicBookID',
      key: 'comicBookID',
    },
    {
      title: 'Book Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Price per Day',
      dataIndex: 'pricePerDay',
      key: 'pricePerDay',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button 
            type="primary" 
            style={{ marginRight: 10 }} 
            onClick={() => handleUpdate(record.comicBookID)}
          >
            Update
          </Button>
          <Button 
            type="primary" 
            danger 
            onClick={() => handleDelete(record.comicBookID)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table 
        dataSource={comicBooks} 
        columns={columns} 
        rowKey="comicBookID"
        loading={loading} 
      />
    </div>
  );
};

export default ComicBooksList;
