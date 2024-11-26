import React from 'react';
import { Form, Input, Button, DatePicker, message } from 'antd';
import axios from 'axios';

const RentBooksForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Assumes a specific comicBookID and quantity in rental details
    const rentalData = {
      customerID: values.CustomerID,
      returnDate: values.ReturnDate,
      status: values.Status,
      rentalDetails: [
        {
          comicBookID: 1,  // Use a valid comicBookID
          quantity: 2,
          pricePerDay: 3.0, // Set a correct value
        },
      ],
    };

    axios.post('http://localhost:5179/api/rentals/rental/books', rentalData)
      .then(() => {
        message.success('Books rented');
        form.resetFields();
      })
      .catch((error) => {
        message.error('Failed to rent books');
        console.error(error);
      });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="CustomerID" label="Customer ID" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="ReturnDate" label="Return Date" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="Status" label="Status" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Rent Books
      </Button>
    </Form>
  );
};

export default RentBooksForm;
