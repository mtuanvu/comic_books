import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateComicBook = () => {
  const [comicBook, setComicBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { comicBookID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5179/api/comic-books/${comicBookID}`)
      .then(response => {
        setComicBook(response.data);
      })
      .catch(error => {
        message.error('Failed to fetch comic book data');
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [comicBookID]);

  const onFinish = (values) => {
    axios.put(`http://localhost:5179/api/comic-books/update/${comicBookID}`, values)
      .then(() => {
        message.success('Comic book updated successfully');
        navigate('/comic-books');
      })
      .catch((error) => {
        message.error('Failed to update comic book');
        console.error(error);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Form onFinish={onFinish} initialValues={comicBook}>
      <Form.Item label="Book Name" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Author" name="author" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Price per Day" name="pricePerDay" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Update
      </Button>
    </Form>
  );
};

export default UpdateComicBook;
