// Explanation:
// `rows` is declared as const, so it cannot be changed.
// But we want to update rows from json file,
// so we need to use useState to declare rows as a state variable,
// and use useEffect to fetch data from json file and update rows.
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid' // https://mui.com/x/react-data-grid/getting-started/
import DataJson_loc from './SearchShowAction_2.json';
// const DataJson = 'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6';
import { GridFilterModel } from '@mui/x-data-grid';

// define columns: 名稱, 地點, 票價
const columns = [
  { field: 'title', headerName: '名稱', width: 200 },
  { field: 'location', headerName: '地點', width: 300 },
  { field: 'price', headerName: '票價', width: 400 },
];

// // example rows
// const rows_demo = [
//   { id: 1, title: '台北101', location: '台北市信義區', price: 'NT$600' },
//   { id: 2, title: '故宮博物院', location: '台北市士林區', price: 'NT$350' },
//   { id: 3, title: '國立歷史博物館', location: '台中市西屯區', price: 'NT$300' },
//   { id: 4, title: '國立自然科學博物館', location: '台中市北區', price: 'NT$250' },
//   { id: 5, title: '國立台灣博物館', location: '台南市安平區', price: 'NT$200' },
// ];

// in json, load data['title'] as '名稱',
// data['showInfo'][0]['location'] as '地點'
// data['showInfo'][0]['price'] as '票價'

// export DataGrid component
export default function DataGridComp() {
  const [rows, setRows] = useState([]);
  // the above line is to declare rows as a state variable
  // and setRows as a function to update rows
  // useState([]) is to initialize rows as an empty array
  // setRows(newRows) is to update rows with newRows
  // newRows is the data fetched from json file
  // Do we need to implement setRows? No, it is implemented by useState

  // use fetch.then
  // useEffect(() => {
  //     fetch(DataJson)
  //     .then(response => {
  //       if(!response.ok) {
  //         console.error('Network response was not ok, use local catched data instead.');
  //         return DataJson_loc; // this is a local json file, so no need to use something like DataJson_loc.json()
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log(data);
  //       const newRows = data.map((data, index) => {
  //         return {
  //           id: index + 1,
  //           title: data['title'],
  //           location: data['showInfo'][0]['location'],
  //           price: data['showInfo'][0]['price']
  //         };
  //       });
  //       setRows(newRows);
  //     });
  // }, []);

  // // use async/await
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(DataJson);
  //       if (!response.ok) {
  //         console.error('Network response was not ok, use local catched data instead.');
  //         const data = DataJson_loc;
  //         const newRows = data.map((data, index) => {
  //           return {
  //             id: index + 1,
  //             title: data['title'],
  //             location: data['showInfo'][0]['location'],
  //             price: data['showInfo'][0]['price']
  //           };
  //         });
  //         setRows(newRows);
  //       } else {
  //         console.log('Network response was ok, use data from json file.');
  //         const data = await response.json();
  //         const newRows = data.map((data, index) => {
  //           return {
  //             id: index + 1,
  //             title: data['title'],
  //             location: data['showInfo'][0]['location'],
  //             price: data['showInfo'][0]['price']
  //           };
  //         });
  //         setRows(newRows);
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // use async/ :: for debug/development, use local json file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = DataJson_loc;
          const newRows = data.map((data, index) => {
            return {
              id: index + 1,
              title: data['title'],
              location: data['showInfo'][0]['location'],
              price: data['showInfo'][0]['price']
            };
          });
          setRows(newRows);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pagination: https://mui.com/x/react-data-grid/pagination/
        initialState={{
          pagination: {
            paginationModel:
            { pageSize: 10 }
          },
          // filter: {
          //   filterModel: {
          //     //quickFilterValues: [],
          //   }
          // }
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
        disableSelectionOnClick
        //sx={{ '& .MuiDataGrid-cell': { borderRight: '1px solid #e0e0e0' } }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          }
        }}
      />
    </div>
  );
}