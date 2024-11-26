import React, { useState } from 'react';
import { Table, DatePicker, Button } from 'antd';
import axios from 'axios';
import moment from 'moment';  // Import moment for date formatting

const RentalReport = () => {
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReport = async (startDate, endDate) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5179/api/rentals/report', {
        params: {
          startDate: startDate.format('YYYY-MM-DD'),
          endDate: endDate.format('YYYY-MM-DD'),
        },
      });

      // Convert the date fields into proper format
      const formattedData = response.data.map((item) => ({
        ...item,
        rentalDate: moment(item.rentalDate).format('DD/MM/YYYY'),  // Format the rental date
        returnDate: moment(item.returnDate).format('DD/MM/YYYY'),  // Format the return date
      }));

      setReport(formattedData);
    } catch (error) {
      console.error('Error fetching report', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'Book Name', dataIndex: 'bookName' },
    { title: 'Rental Date', dataIndex: 'rentalDate' },
    { title: 'Return Date', dataIndex: 'returnDate' },
    { title: 'Customer Name', dataIndex: 'customerName' },
    { title: 'Quantity', dataIndex: 'quantity' },
  ];

  return (
    <div>
      <DatePicker.RangePicker onChange={(dates) => fetchReport(dates[0], dates[1])} />
      <Button onClick={() => fetchReport()}>Get Report</Button>
      <Table columns={columns} dataSource={report} rowKey="id" loading={loading} />
    </div>
  );
};

export default RentalReport;
