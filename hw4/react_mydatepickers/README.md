```JSX
// third version of MyDatePicker.jsx
import React, { useState, useEffect, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function MyDatePicker() {
  const [date, setDate] = useState(); // 使用 useState 來管理日期狀態
  const datePickerRef = useRef(null);
  const customInputRef = useRef(null);

  useEffect(() => {
    if (datePickerRef.current) {
      // 獲取 DatePicker 元素的 input
      const datePickerInput = datePickerRef.current.querySelector('input');
      if (datePickerInput) {
        // 創建並插入新的 input 元素
        const newInput = document.createElement("input");
        // aria-invalid="false"  // 自定義輸入框屬性設定
        newInput.setAttribute("aria-invalid", "false");
        newInput.setAttribute("autocomplete", "off");
        newInput.setAttribute("placeholder", "民國yyy年mm月dd日");
        newInput.setAttribute("class", "MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd css-nxo287-MuiInputBase-input-MuiOutlinedInput-input");

        customInputRef.current = newInput;
// test: 民國113年12月5日
        // 在 DatePicker 輸入框之前插入新的輸入框
        datePickerInput.parentNode.insertBefore(newInput, datePickerInput);

        // 隱藏 DatePicker 的原始輸入框
        // datePickerInput.style.display = "none";

        // 設置監聽器，當自定義輸入框的值變更時更新 DatePicker 的值
        newInput.addEventListener('input', () => {
          // parse the input value which should follow the format '民國yyy年mm月dd日' where yyy may be among 2 or 3 digits.
          // and then calculate YYYY = 1911 + yyy
          const dateStr = newInput.value;
          const match = dateStr.match(/民國(\d{2,3})年(\d{1,2})月(\d{1,2})日/);
          if (match) {
            const year = parseInt(match[1]) + 1911;
            const month = parseInt(match[2]);
            const day = parseInt(match[3]);
            const newDate = dayjs(`${year}/${month}/${day}`);
            if (newDate.isValid()) {
              setDate(newDate);
            }
          }

          // const newDate = dayjs(newInput.value, 'MM/DD/YYYY');
          // if (newDate.isValid()) {
          //   setDate(newDate);
          // }
        });

        // 當 DatePicker 的值變更時，同步更新自定義輸入框的值
        datePickerInput.addEventListener('input', () => {
          newInput.value = datePickerInput.value;
        });
      }
    }
  }, []);

  return (
    <div id="d" ref={datePickerRef}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
            if (customInputRef.current) {
              //customInputRef.current.value = newValue.format('MM/DD/YYYY'); // 更新自定義輸入框的值
              customInputRef.current.value = `民國${newValue.year() - 1911}年${newValue.month() + 1}月${newValue.date()}日`;
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
```

```JSX
// MyDatePicker.jsx second version
import React, { useEffect, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MyDatePicker() {
  const datePickerRef = useRef(null);
  const customInputRef = useRef(null);

  useEffect(() => {
    if (datePickerRef.current) {
      // 獲取 DatePicker 元素的 input
      const datePickerInput = datePickerRef.current.querySelector('input');
      // const datePickerInput = document.getElementById('d').firstChild.firstChild.firstChild;
      if (datePickerInput) {
        // 創建並插入新的 input 元素
        const newInput = document.createElement("input");
        //newInput.value = "03/01/2024";
        newInput.style.display = "block";  // 顯示自定義輸入框
        customInputRef.current = newInput;
        
        // 在 DatePicker 輸入框之前插入新的輸入框
        datePickerInput.parentNode.insertBefore(newInput, datePickerInput);
        
        // 隱藏 DatePicker 的原始輸入框
        //datePickerInput.style.display = "none";

        // 設置監聽器，當自定義輸入框的值變更時更新 DatePicker 的值
        newInput.addEventListener('input', () => {
          datePickerInput.value = newInput.value;
          // 觸發 change 事件以通知 DatePicker 的輸入值已更新
          datePickerInput.dispatchEvent(new Event('change', { bubbles: true }));
          console.log('newInput changed: ', newInput.value);
        });

        datePickerInput.addEventListener('change', () => {
          console.log('datePickerInput changed: ', datePickerInput.value);
          newInput.value = datePickerInput.value;
        });
      }
    }
  }, []);

  return (
    <div id="d" ref={datePickerRef}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
    </div>
  );
}

```

```JSX
// MyDatePicker.jsx original version
import React, { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function MyDatePicker() {
  useEffect(() => {
    const dpn = document.getElementById("d").firstChild.firstChild;
    // insert a new input element before the input element of DatePicker
    const newInput = document.createElement("input");
    dpn.insertBefore(newInput, dpn.childNodes[0]);
    const ins = dpn.childNodes[1];
    ins.style.display="none";
    ins.value = "03/01/2024";
  }, []);
  return (
    <div id="d">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker />
      </LocalizationProvider>
    </div>
  );
}
```
# npm install
The following code is deprecated.
```shell
npm install @material-ui/styles
npm install @material/textfield
```

Use mui instead. Ref: https://www.npmjs.com/package/@mui/x-date-pickers
```shell
npm install @mui/x-date-pickers
```

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
