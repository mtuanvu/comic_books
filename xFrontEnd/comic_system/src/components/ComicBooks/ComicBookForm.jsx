import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const ComicBookForm = ({ comicBook, onClose }) => {
  const [form] = Form.useForm();

  
  const onFinish = (values) => {
    if (comicBook) {
      
      axios.put(`http://localhost:5179/api/comic-books/update/${comicBook.ComicBookID}`, values)
        .then(() => {
          message.success('Comic book updated');
          if (typeof onClose === 'function') {
            onClose();
          }
        })
        .catch((error) => {
          message.error('Failed to update comic book');
          console.error(error);
        });
    } else {
      
      axios.post('http://localhost:5179/api/comic-books/add', values)
        .then(() => {
          message.success('Comic book created');
          if (typeof onClose === 'function') {
            onClose();
          }
        })
        .catch((error) => {
          message.error('Failed to create comic book');
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (comicBook) {
      form.setFieldsValue({
        Title: comicBook.title,
        Author: comicBook.author,
        PricePerDay: comicBook.pricePerDay
      });
    }
  }, [comicBook]);

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item 
        name="Title" 
        label="Book Name" 
        rules={[{ required: true, message: 'Please input the book name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="Author" 
        label="Author" 
        rules={[{ required: true, message: 'Please input the author!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="PricePerDay" 
        label="Price per Day" 
        rules={[{ required: true, message: 'Please input the price per day!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {comicBook ? 'Update' : 'Create'}
      </Button>
    </Form>
  );
};

export default ComicBookForm;
