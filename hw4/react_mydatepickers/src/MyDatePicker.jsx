import React, { useState, useEffect, useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function MyDatePicker() {
  const [date, setDate] = useState(null); // 使用 useState 來管理日期狀態，
  const datePickerRef = useRef(null);
  const customInputRef = useRef(null);

  const TEMPLATE_TEXT = "民國yyy年-mm月-dd號";

  useEffect(() => {
    if (datePickerRef.current) {
      // 獲取 DatePicker 元素的 input
      const datePickerInput = datePickerRef.current.querySelector('input');
      const datePickerDiv = datePickerRef.current.firstChild.firstChild;
      if (datePickerInput) {
        // 創建並插入新的 input 元素
        const newInput = document.createElement("input");
        newInput.setAttribute("aria-invalid", "false");
        newInput.setAttribute("autocomplete", "off");
        newInput.setAttribute("placeholder", TEMPLATE_TEXT);
        newInput.setAttribute("class", "MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd css-nxo287-MuiInputBase-input-MuiOutlinedInput-input");

        customInputRef.current = newInput;

        // 在 DatePicker 輸入框之前插入新的輸入框
        datePickerInput.parentNode.insertBefore(newInput, datePickerInput);

        // 隱藏 DatePicker 的原始輸入框
        datePickerInput.style.display = "none";

        // 設置監聽器，當自定義輸入框的值變更時更新 DatePicker 的值
        newInput.addEventListener('input', () => {
          const dateStr = newInput.value;
          const match = dateStr.match(/民國(\d{1,3})年-(\d{1,2})月-(\d{1,2})號/);
          if (match) {
            const year = parseInt(match[1]) + 1911;
            const month = parseInt(match[2]);
            const day = parseInt(match[3]);
            const newDate = dayjs(`${year}/${month}/${day}`);
            if (newDate.isValid()){
              datePickerDiv.classList.remove("Mui-error");
              setDate(newDate);
            } else {
              datePickerDiv.classList.add("Mui-error");
            }
          } else if (dateStr !== '') {
            datePickerDiv.classList.add("Mui-error");
          }
        });

        // 當 DatePicker 的值變更時，同步更新自定義輸入框的值
        datePickerInput.addEventListener('input', () => {
          newInput.value = datePickerInput.value;
        });

        // 添加點擊事件，根據光標位置選擇年、月或日的數字
        newInput.addEventListener('click', (event) => {
          const value = newInput.value;
          const yearIndex = value.indexOf('年');
          const monthIndex = value.indexOf('月');
          const dayIndex = value.indexOf('號');
          const cursorPosition = event.target.selectionStart;

          if (cursorPosition <= yearIndex) {
            // 選擇年
            newInput.setSelectionRange(2, yearIndex);
          } else if (cursorPosition <= monthIndex) {
            // 選擇月
            newInput.setSelectionRange(yearIndex + 2, monthIndex);
          } else if (cursorPosition <= dayIndex) {
            // 選擇號
            newInput.setSelectionRange(monthIndex + 2, dayIndex);
          }
        });

        // 當自定義輸入框獲得焦點時，如果值為空，設置為模板文本
        newInput.addEventListener('focus', () => {
          // 設置 datepicker 的 div 為藍色邊框: 增加 Mui-focused class
          datePickerDiv.classList.add("Mui-focused");
          
          if (!newInput.value) {
            newInput.value = TEMPLATE_TEXT;
          }
        });

        // 當自定義輸入框失去焦點時，如果值仍為模板文本，設置為空
        newInput.addEventListener('blur', () => {
          // 移除 datepicker 的 div 藍色邊框: 移除 Mui-focused class
          datePickerDiv.classList.remove("Mui-focused");
          
          if (newInput.value === TEMPLATE_TEXT) {
            newInput.value = '';
          }
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
              customInputRef.current.value = `民國${newValue.year() - 1911}年-${newValue.month() + 1}月-${newValue.date()}號`;
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
}