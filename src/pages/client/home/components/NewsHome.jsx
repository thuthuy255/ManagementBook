import { Grid, Typography } from '@mui/material';
import { BACKGROUND_DEFAULT, BACKGROUND_WHITE } from 'constants/Color';
import React, { memo } from 'react';
import NewspaperIcon from '@mui/icons-material/Newspaper';
function NewsHome() {
  return (
    <Grid container item md={10} xs={12} sx={{ backgroundColor: BACKGROUND_WHITE }} borderRadius={'8px'}>
      <Grid
        item
        container
        md={12}
        display={'flex'}
        alignItems={'center '}
        px={2}
        style={{ background: 'linear-gradient(135deg, #FCDDEF, #FF6347)', borderTopRightRadius: '8px', borderTopLeftRadius: '8px' }}
      >
        <NewspaperIcon fontSize="large" sx={{ color: BACKGROUND_DEFAULT }} />
        <Typography ml={1} variant="h4" gutterBottom mb={0} pt={2} pb={2} textAlign={'center'}>
          Tin mới nhất
        </Typography>
      </Grid>
    </Grid>
  );
}

export default memo(NewsHome);
