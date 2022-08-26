import React, { useRef } from "react";
import Button from "../ui/button";
import styles from './event-search.module.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const EventsSearch = (props) => {
  const { onSearch } = props;

  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    onSearch(selectedYear, selectedMonth);
  }

  return (
    <form className={styles.form}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Year</label>
          <select id="month" ref={monthInputRef}>
            {
              months.map((month, ind) => (
                <option key={month} value={`${ind + 1}`}>{month}</option>
              ))
            }
          </select>
        </div>
      </div>
      <Button onClick={submitHandler}>Find Events</Button>
    </form>
  );
}

export default EventsSearch;