import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';

// export DataGrid component
export default function DataGridComp() { // Receive searchTerm prop

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6'
        );
        const result = await response.json();
        const mappedData = result.map((item) => ({
          ...item,
          location: item.showInfo[0]?.location,
          price: item.showInfo[0]?.price
        }));
        setData(mappedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const timeoutId = useRef(null);

  const handleSearchTitle = (event) => {
    const value = event.target.value;

    timeoutId.current = setTimeout(() => {
      setSearchTerm(value);
    }, 500);
  };

  const filtered = data.filter((item) => item.title.includes(searchTerm));

  const columns = [
    { field: 'title', headerName: '名稱', width: 400 },
    { field: 'location', headerName: '地點', width: 300 },
    { field: 'price', headerName: '票價', width: 600 },
  ];

  return (
    <div style={{ height: 635, width: '100%' }}>
      {/* <h1 style={{ height: 0, textAlign: 'left', marginBottom: 15 }} >景點觀光展覽資訊</h1> */}
      <input
        type="text"
        onChange={handleSearchTitle}
        placeholder="在名稱中查詢..."
        style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto'}}
      />
      <DataGrid
        rows={filtered}
        columns={columns}
        getRowId={(row) => row.UID}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </div>
  );
};