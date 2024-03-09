import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const StaffInvent = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Inventory Check
      </Typography>

      {/* Towel Card */}
      <Card>
        <CardContent>
          <Typography variant="h6" display="inline-block" style={{ marginRight: '66px' }}>
            Towel
          </Typography>
          <Button variant="contained" style={{ backgroundColor: 'green' }}>
            <CheckIcon />
          </Button>
          <Button variant="contained" style={{ backgroundColor: 'red', marginLeft: '8px' }}>
            <ClearIcon />
          </Button>
        </CardContent>
      </Card>

      {/* Toiletry Card */}
      <Card>
        <CardContent>
          <Typography variant="h6" display="inline-block" style={{ marginRight: '66px' }}>
            Toiletry
          </Typography>
          <Button variant="contained" style={{ backgroundColor: 'green' }}>
            <CheckIcon />
          </Button>
          <Button variant="contained" style={{ backgroundColor: 'red', marginLeft: '8px' }}>
            <ClearIcon />
          </Button>
        </CardContent>
      </Card>

      {/* Minibar Card */}
      <Card>
        <CardContent>
          <Typography variant="h6" display="inline-block" style={{ marginRight: '66px' }}>
            Minibar
          </Typography>
          <Button variant="contained" style={{ backgroundColor: 'green' }}>
            <CheckIcon />
          </Button>
          <Button variant="contained" style={{ backgroundColor: 'red', marginLeft: '8px' }}>
            <ClearIcon />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffInvent;
