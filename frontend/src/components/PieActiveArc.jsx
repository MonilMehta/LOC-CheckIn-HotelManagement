// PieActiveArc.jsx
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const PieActiveArc = ({ length1, length2 }) => {
  const data = [
    { id: 0, value: length1, label: 'Clean Rooms' },
    { id: 1, value: length2, label: 'Rooms Under Maintenance' },
  ];
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
      width={400}
    />
  );
};

export default PieActiveArc;
