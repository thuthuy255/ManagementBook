import { Box, Grid, Typography } from '@mui/material';
import { BACKGROUND_DEFAULT, BACKGROUND_WHITE } from 'constants/Color';
import React, { memo } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector } from 'react-redux';
import { getCategories } from 'features/slices/category.slice';
function ListProductsTopTrend() {
  const getListCategary = useSelector(getCategories);
  const [value, setValue] = React.useState(getListCategary[0].id);
  console.log('🚀 ~ ListProductsTopTrend ~ getListCategary:', getListCategary);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container item md={10} xs={12} sx={{ backgroundColor: BACKGROUND_WHITE }} borderRadius={'8px'}>
      <Grid
        item
        container
        display={'flex'}
        alignItems={'center '}
        px={2}
        style={{ background: 'linear-gradient(135deg, #FFA500, #FF6347)', borderTopRightRadius: '8px', borderTopLeftRadius: '8px' }}
      >
        <TrendingUpIcon fontSize="large" sx={{ color: BACKGROUND_DEFAULT }} />
        <Typography ml={1} variant="h4" gutterBottom mb={0} pt={2} pb={2}>
          Xu hướng mua sắm
        </Typography>
      </Grid>
      <Grid item container>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                '& .MuiTabs-indicator': { backgroundColor: 'red' },
                '& .MuiTab-root': { color: 'gray' },
                '&:hover': { color: `${BACKGROUND_DEFAULT} !important` }, // Màu khi hover
                '& .Mui-selected': { color: `${BACKGROUND_DEFAULT} !important` },
                '& .root-MuiTab-root.Mui-selected': { color: `${BACKGROUND_DEFAULT} !important` }
              }}
            >
              {getListCategary?.slice(0, 3)?.map((item) => (
                <Tab label={item.type} value={item.id} />
              ))}
            </TabList>
          </Box>

          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
}

export default memo(ListProductsTopTrend);
