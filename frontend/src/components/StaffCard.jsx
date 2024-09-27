<Grid container spacing={3}>
  {staffData.map((staff) => (
    <Grid item xs={12} sm={6} md={4}>
      <StyledCard>
        <CardContent>
          <Typography variant="h6">{staff.name}</Typography>
          <Typography variant="body1" color="textSecondary">
            Cleaned Rooms: {staff.cleanedRooms}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Rooms under Maintenance: {staff.maintenanceRooms}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(staff.cleanedRooms / staff.totalRooms) * 100}
            sx={{ height: 10, borderRadius: 5, mt: 2 }}
          />
          <Typography variant="body2" color="textSecondary" align="right">
            {`Cleanliness Rate: ${Math.round((staff.cleanedRooms / staff.totalRooms) * 100)}%`}
          </Typography>
        </CardContent>
      </StyledCard>
    </Grid>
  ))}
</Grid>
