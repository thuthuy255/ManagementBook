import React, { memo } from 'react';

import { Grid, Typography } from '@mui/material';
import { listTools } from 'data/DataFeatures';
function ToolsHome() {
  return (
    <Grid
      container
      pt={2}
      display={'flex'}
      justifyContent={'space-between'}
      mt={2}
      p={2}
      borderRadius={'10px'}
      style={{ backgroundColor: '#fff' }}
    >
      {listTools?.map((item) => (
        <Grid
          className="Button_Hover"
          key={item.id}
          item
          md={1}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          style={{ cursor: 'pointer' }}
        >
          <img src={item.icon} alt={item.name} width={46} height={46} />
          <Typography textAlign={'center'} mb={0}>
            {item.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

export default memo(ToolsHome);
