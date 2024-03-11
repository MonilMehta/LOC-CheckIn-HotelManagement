import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ResponsiveAppBarAdmin from './AdminNavbar';
import Footer from './Footer';

export default function SchedulingCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  return (
    <div>
      <ResponsiveAppBarAdmin />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          {/* Calendar on the left side */}
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            locale="en-US"
            dateFormat="MMMM d, yyyy"
          />
        </div>
        <div style={{ flex: '1' }}>
          {/* Content on the right side */}
          {/* Section to add notes */}
          <div style={{ marginBottom: '20px' }}>
            <textarea
              rows="4"
              cols="50"
              placeholder="Add notes..."
              value={notes}
              onChange={handleNotesChange}
              style={{ width: '100%', fontSize: '16px' }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
