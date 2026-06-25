import "./CalendarView.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

function CalendarView({ entries }) {

  const navigate = useNavigate();

  const handleDateClick = (date) => {

    navigate("/diary");

  };

  const hasEntry = (date) => {

  const formattedDate =
    date.toLocaleDateString();

  return entries.some(
    (entry) => entry.date === formattedDate
  );

};

  return (

    <div>

     <Calendar
  onClickDay={handleDateClick}
  tileClassName={({ date }) =>
    hasEntry(date)
      ? "entry-date"
      : ""
  }
/>

    </div>

  );
}

export default CalendarView;