// import React, { useState, useEffect } from 'react';
// import { 
//   Typography, Paper, Box, Grid, Card, CardContent, CardMedia, Chip, 
//   List, ListItem, ListItemIcon, ListItemText, Button, Tab, Tabs,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import {
//   BedOutlined as BedIcon,
//   Person as PersonIcon,
//   CalendarToday as CalendarTodayIcon,
//   LocalDrink as BottleIcon,
//   LocalCafe as CupIcon,
//   RiceBowl as BowlIcon,
//   Build as BuildIcon,
//   CheckCircle as CheckCircleIcon,
//   Timeline as TimelineIcon,
//   Assessment as AssessmentIcon
// } from '@mui/icons-material';
// import WineBarIcon from '@mui/icons-material/WineBar';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const StatusChip = styled(Chip)(({ theme, status }) => ({
//   backgroundColor: status === 'clean' ? theme.palette.success.light : theme.palette.warning.light,
//   color: status === 'clean' ? theme.palette.success.contrastText : theme.palette.warning.contrastText,
//   fontWeight: 'bold',
//   fontSize: '1rem',
//   padding: theme.spacing(1),
// }));

// const ItemCard = styled(Card)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2),
//   marginBottom: theme.spacing(2),
// }));

// const AdminReport = ({ room, onClose }) => {
//   const [tabValue, setTabValue] = useState(0);
//   const [cleaningHistory, setCleaningHistory] = useState([]);
//   const [itemTrends, setItemTrends] = useState([]);

//   useEffect(() => {
//     // Simulated API call to fetch cleaning history
//     const fetchCleaningHistory = async () => {
//       // Replace this with actual API call
//       const mockHistory = [
//         { date: '2023-09-25', employee: 'John Doe', status: 'clean' },
//         { date: '2023-09-23', employee: 'Jane Smith', status: 'maintenance' },
//         { date: '2023-09-21', employee: 'John Doe', status: 'clean' },
//       ];
//       setCleaningHistory(mockHistory);
//     };

//     // Simulated API call to fetch item trends
//     const fetchItemTrends = async () => {
//       // Replace this with actual API call
//       const mockTrends = [
//         { date: '2023-09-21', bottles: 2, cups: 1, wineGlasses: 0, bowls: 1 },
//         { date: '2023-09-23', bottles: 1, cups: 2, wineGlasses: 1, bowls: 0 },
//         { date: '2023-09-25', bottles: 0, cups: 1, wineGlasses: 0, bowls: 1 },
//       ];
//       setItemTrends(mockTrends);
//     };

//     fetchCleaningHistory();
//     fetchItemTrends();
//   }, [room.room_number]);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const getMaintenanceTips = () => {
//     const tips = [];
//     if (room.bottle > 0) tips.push("Check and remove bottles");
//     if (room.cup > 0) tips.push("Collect and clean cups");
//     if (room.wine_glass > 0) tips.push("Carefully handle and clean wine glasses");
//     if (room.bowl > 0) tips.push("Clear and sanitize bowls");
//     return tips;
//   };

//   const maintenanceTips = getMaintenanceTips();

//   return (
//     <Paper elevation={3} sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h4" component="h1">
//           Room {room.room_number} Report
//         </Typography>
//         <StatusChip 
//           label={room.status.toUpperCase()} 
//           status={room.status}
//           icon={room.status === 'clean' ? <CheckCircleIcon /> : <BuildIcon />}
//         />
//       </Box>

//       <Tabs value={tabValue} onChange={handleTabChange} aria-label="room report tabs">
//         <Tab icon={<BedIcon />} label="Overview" />
//         <Tab icon={<TimelineIcon />} label="History" />
//         <Tab icon={<AssessmentIcon />} label="Trends" />
//       </Tabs>

//       <Box sx={{ mt: 2 }}>
//         {tabValue === 0 && (
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="300"
//                   image={room.room_image}
//                   alt={`Room ${room.room_number}`}
//                 />
//               </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <List>
//                 <ListItem>
//                   <ListItemIcon><PersonIcon /></ListItemIcon>
//                   <ListItemText 
//                     primary="Last cleaned by" 
//                     secondary={room.employee || "Not assigned"}
//                   />
//                 </ListItem>
//                 <ListItem>
//                   <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                   <ListItemText 
//                     primary="Last checked" 
//                     secondary={new Date(room.last_checked).toLocaleString()}
//                   />
//                 </ListItem>
//               </List>
              
//               <Typography variant="h6" mt={2} mb={1}>Current Items:</Typography>
//               <Grid container spacing={2}>
//                 {[
//                   { icon: BottleIcon, label: 'Bottles', count: room.bottle },
//                   { icon: CupIcon, label: 'Cups', count: room.cup },
//                   { icon: WineBarIcon, label: 'Wine Glasses', count: room.wine_glass },
//                   { icon: BowlIcon, label: 'Bowls', count: room.bowl },
//                 ].map((item, index) => (
//                   <Grid item xs={6} key={index}>
//                     <ItemCard>
//                       <item.icon sx={{ fontSize: 40, mr: 2 }} />
//                       <Box>
//                         <Typography variant="h6">{item.count}</Typography>
//                         <Typography variant="body2">{item.label}</Typography>
//                       </Box>
//                     </ItemCard>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Grid>
//           </Grid>
//         )}

//         {tabValue === 1 && (
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Employee</TableCell>
//                   <TableCell>Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {cleaningHistory.map((record, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{record.date}</TableCell>
//                     <TableCell>{record.employee}</TableCell>
//                     <TableCell>
//                       <Chip 
//                         label={record.status.toUpperCase()} 
//                         color={record.status === 'clean' ? 'success' : 'warning'}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         {tabValue === 2 && (
//           <Box height={300}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={itemTrends}
//                 margin={{
//                   top: 5,
//                   right: 30,
//                   left: 20,
//                   bottom: 5,
//                 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="bottles" fill="#8884d8" />
//                 <Bar dataKey="cups" fill="#82ca9d" />
//                 <Bar dataKey="wineGlasses" fill="#ffc658" />
//                 <Bar dataKey="bowls" fill="#ff8042" />
//               </BarChart>
//             </ResponsiveContainer>
//           </Box>
//         )}
//       </Box>

//       {room.status === 'maintenance' && maintenanceTips.length > 0 && (
//         <Box mt={3}>
//           <Typography variant="h6" gutterBottom>Maintenance Tips:</Typography>
//           <List>
//             {maintenanceTips.map((tip, index) => (
//               <ListItem key={index}>
//                 <ListItemIcon><BuildIcon color="warning" /></ListItemIcon>
//                 <ListItemText primary={tip} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       )}

//       <Box mt={3} display="flex" justifyContent="flex-end">
//         <Button variant="contained" onClick={onClose}>Close</Button>
//       </Box>
//     </Paper>
//   );
// };

// export default AdminReport;

import React from 'react'

const AdminReport = () => {
  return (
    <div>
      <h1>Admin Report</h1>
    </div>
  )
}

export default AdminReport
