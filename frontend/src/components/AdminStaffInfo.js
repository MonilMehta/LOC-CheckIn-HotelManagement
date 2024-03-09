import React, { useState, useEffect } from 'react';
import ResponsiveAppBarAdmin from './AdminNavbar';

const AdminStaffInfo = () => {
  const staffData = [
    { name: 'John Doe', room: 'Room 101', floor: 1 },
    { name: 'Jane Smith', room: 'Room 202', floor: 2 },
    { name: 'Bob Johnson', room: 'Room 303', floor: 3 },
    { name: 'Alice Brown', room: 'Room 404', floor: 4 },
    { name: 'Charlie Davis', room: 'Room 505', floor: 5 },
    { name: 'Eva White', room: 'Room 606', floor: 6 },
    { name: 'Frank Miller', room: 'Room 707', floor: 7 },
    { name: 'Grace Wilson', room: 'Room 808', floor: 8 },
    { name: 'Harry Turner', room: 'Room 909', floor: 9 },
    { name: 'Isabel Lee', room: 'Room 1010', floor: 10 },
    { name: 'Jack Robinson', room: 'Room 1111', floor: 11 },
    { name: 'Kelly Garcia', room: 'Room 1212', floor: 12 },
    { name: 'Leo Martinez', room: 'Room 1313', floor: 13 },
    { name: 'Mia Perez', room: 'Room 1414', floor: 14 },
    { name: 'Noah Taylor', room: 'Room 1515', floor: 15 },
    // Add more staff data as needed
  ];

  const [randomStaff, setRandomStaff] = useState([]);

  useEffect(() => {
    // Shuffle the staff array to get a random order
    const shuffledStaff = [...staffData].sort(() => Math.random() - 0.5);

    // Select the first 15 staff members
    const selectedStaff = shuffledStaff.slice(0, 15);

    setRandomStaff(selectedStaff);
  }, []);

  return (
    <div>
      <ResponsiveAppBarAdmin />
      <div>
        <h2>Staff Information</h2>
        {randomStaff.map((staff, index) => (
          <div key={index}>
            <h3>Staff {index + 1}:</h3>
            <p>
              Name: {staff.name} | Floor: {staff.floor} | Allotted Room: {staff.room}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStaffInfo;
