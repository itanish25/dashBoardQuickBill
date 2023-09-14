// import { Avatar, Rate, Space, Table, Typography } from "antd";
// import { useEffect, useState } from "react";
// import { getInventory } from "../../API";

// function Inventory() {
  // const [loading, setLoading] = useState(false);
  // const [dataSource, setDataSource] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   getInventory().then((res) => {
  //     setDataSource(res.products);
  //     setLoading(false);
  //   });
  // }, []);

//   return (
//     <Space size={20} direction="vertical">
//       <Typography.Title level={4}>Inventory</Typography.Title>
//       <Table
//         loading={loading}
//         columns={[
//           {
//             title: "Thumbnail",
//             dataIndex: "thumbnail",
//             render: (link) => {
//               return <Avatar src={link} />;
//             },
//           },
//           {
//             title: "Title",
//             dataIndex: "title",
//           },
//           {
//             title: "Price",
//             dataIndex: "price",
//             render: (value) => <span>${value}</span>,
//           },
//           {
//             title: "Rating",
//             dataIndex: "rating",
//             render: (rating) => {
//               return <Rate value={rating} allowHalf disabled />;
//             },
//           },
//           {
//             title: "Stock",
//             dataIndex: "stock",
//           },

//           {
//             title: "Brand",
//             dataIndex: "brand",
//           },
//           {
//             title: "Category",
//             dataIndex: "category",
//           },
//         ]}
//         dataSource={dataSource}
//         pagination={{
//           pageSize: 5,
//         }}
//       ></Table>
//     </Space>
//   );
// }
// export default Inventory;

import { SearchOutlined, EyeOutlined} from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table, Typography } from 'antd';
import "./styles.css";
// import { getInventory } from "../../API";
const data = [
  {
    id: "1",
    companyName: "Evolve",
    Date: "Wed Sep 13 2023 20:15:33 GMT+0530 (India Standard Time)",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/220px-Ash_Tree_-_geograph.org.uk_-_590710.jpg",
  },
];
const Orders = () => {
  // const [loading, setLoading] = useState(false);
  // const [dataSource, setDataSource] = useState([]);

  // useEffect(() => {
  //   setLoading(true);
  //   getInventory().then((res) => {
  //     setDataSource(res.products);
  //     setLoading(false);
  //   });
  // }, []);


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Invoice Id',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      ...getColumnSearchProps('companyName'),
    },
    {
      title: 'Date of generation',
      dataIndex: 'Date',
      key: 'Date',
      render: (text) => {
        function formatDate(dateString) {
          const date = new Date(dateString);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
          const year = date.getFullYear().toString().slice(-2);
    
          return `${day}-${month}-${year}`;
        }
        return formatDate(text);
      },
      ...getColumnSearchProps('Date'),
    },
    {
    title: 'Invoice',
    dataIndex: 'img',
    key: 'img',
    render: (text, record) => {
      const downloadImage = () => {
        const a = document.createElement('a');
        a.href = text;
        a.download = `invoice_${record.id}.png`;
        a.target = '_blank';

        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        a.dispatchEvent(event);
        window.URL.revokeObjectURL(a.href);
      };

      return (
        <Space>
          <Button
            icon={<EyeOutlined />}
            type="primary"
            onClick={downloadImage}
          >
            View
          </Button>
        </Space>
      );
    },
  },
  ];
  return (
    <div>
    <Space size={20} direction="vertical" className="orders-div">
    <Typography.Title level={4}>Orders</Typography.Title>
    <Table 
    // loading={loading}
    columns={columns} 
    dataSource={data} 
    // dataSource={dataSource}
    pagination={{
          pageSize: 5,
        }}
  />
  </Space>
  </div>
  );
};
export default Orders;