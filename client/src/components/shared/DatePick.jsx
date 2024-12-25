import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePick = ({
  dateValue,
  setDateValue,
  placeHolder,
  iconShow,
  endDate,
  requir,
}) => {
  // Utility function to generate a range of numbers

  const range = (start, end, step) => {
    const result = [];
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
    return result;
  };

  // Utility function to get the year from a date
  const getYear = (date) => {
    return date.getFullYear();
  };

  // Utility function to get the month from a date
  const getMonth = (date) => {
    return date.getMonth();
  };

  // Custom utility function to subtract days from a date
  const subDays = (date, days) => {
    const result = new Date(date);
    result.setDate(date.getDate() - days);
    return result;
  };

  // Custom utility function to add days to a date
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
  };

  const years = range(2009, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <DatePicker
      showIcon={iconShow}
      className="input input-bordered w-full"
      placeholderText={placeHolder}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          <button
            className="rounded-lg font-h2  border-2-[#331A15] bg-[#D2B48C] py-1 px-3 font-bold text-[18px] text-[#331A15] "
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            {"<"}
          </button>
          <select
            className="rounded-lg"
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="rounded-lg"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className="rounded-lg font-h2  border-2-[#331A15] bg-[#D2B48C] py-1 px-3 font-bold text-[18px] text-[#331A15] "
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            {">"}
          </button>
        </div>
      )}
      // includeDateIntervals={[
      //   { start: subDays(new Date(), 1), end: addDays(new Date(), endDate) },
      // ]}
      selected={dateValue}
      onChange={(date) => setDateValue(date)}
      dateFormat="dd-MM-yyyy"
      required={requir}
    />
  );
};

export default DatePick;
