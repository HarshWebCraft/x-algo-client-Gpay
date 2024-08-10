import React from 'react';
import { UseSelector, useSelector } from 'react-redux';

const UserIcon = (props) => {

  const icon =props.userName

  const userInitial =   icon.charAt(0).toUpperCase();

  // Style for the round icon
  const iconStyle = {
    width: '40px', // Adjust the size as needed
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3498db', // You can change the background color
    color: '#ffffff', // Text color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px', // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
  };

  return (
    <div style={iconStyle}>
      {userInitial}
    </div>
  );
};

export default UserIcon;