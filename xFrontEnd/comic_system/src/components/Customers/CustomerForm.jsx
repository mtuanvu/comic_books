import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const CustomerForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    axios.post('http://localhost:5179/api/customers/register', values)
      .then(() => {
        message.success('Customer registered');
        form.resetFields();
      })
      .catch((error) => {
        message.error('Failed to register customer');
        console.error(error);
      });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="FullName" label="Full Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="PhoneNumber" label="Phone Number" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Register
      </Button>
    </Form>
  );
};

export default CustomerForm;
