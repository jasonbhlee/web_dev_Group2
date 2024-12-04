import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles for the calendar

function HomePage() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate); // Update the selected date
  };

  return (
    <div>
      {/* Navbar */}
      <nav style={{ backgroundColor: '#333', padding: '10px', color: '#fff' }}>
        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', padding: 0 }}>
          <li><Link to="/" style={{ color: '#fff' }}>Sign Out</Link></li>
          <li><Link to="/profile" style={{ color: '#fff' }}>Profile</Link></li>
          {/* New Projects Link */}
          <li><Link to="/projects" style={{ color: '#fff' }}>Projects</Link></li>
        </ul>
      </nav>

      {/* Home Page Content */}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Welcome to Your Dashboard</h2>
        <p>Select a project to sign up for:</p>
      <Link to="/projects">
        <button>Go to Projects</button>
      </Link>
        {/* Display Selected Date */}
        <p>{date.toDateString()}</p>
        
        {/* Calendar Component */}
        <Calendar 
          onChange={handleDateChange} 
          value={date} 
        />
      </div>
    </div>
  );
}

export default HomePage;
