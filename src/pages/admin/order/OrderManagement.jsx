import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

export default function OrderManagement() {
  return <div>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box bgcolor="lightcoral" p={2}>Cột 1 (6/12)</Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box bgcolor="lightseagreen" p={2}>Cột 2 (6/12)</Box>
      </Grid>
      <Grid item xs={4}>
        <Box bgcolor="gold" p={2}>Cột 3 (4/12)</Box>
      </Grid>
      <Grid item xs={8}>
        <Box bgcolor="lightgray" p={2}>Cột 4 (8/12)</Box>
      </Grid>
    </Grid>
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Đây là Container
      </Typography>
      <Typography>
        Container giúp giữ nội dung ở giữa với độ rộng tối đa là "md" (medium).
      </Typography>
    </Container>
    <Stack spacing={2} direction="row">
      <Button variant="contained">Nút 1</Button>
      <Button variant="outlined">Nút 2</Button>
      <Button variant="text">Nút 3</Button>
    </Stack>
  </div>;
}
