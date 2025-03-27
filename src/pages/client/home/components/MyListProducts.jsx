import { Grid, Typography } from '@mui/material';
import { BACKGROUND_DEFAULT, BACKGROUND_WHITE } from 'constants/Color';
import { getAllBookQuery } from 'pages/admin/book/services/book.query';
import React, { memo, useState } from 'react';
import BookIcon from '@mui/icons-material/Book';
import ListProducts from './ListProducts';
import Loading from 'components/loading/Loading';
import { formatPrice } from 'utils/format';
function MyListProducts() {
  const [searchProducts, setSearchProducts] = useState({
    keyword: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'price',
    sort: 'desc',
    page: 1,
    limit: 20
  });
  const { data: books, isLoading: isLoadingBook, error } = getAllBookQuery({ params: searchProducts });

  const getImage = (product) => {
    if (product.img_src) {
      const images = JSON.parse(product.img_src);
      return images?.length ? images[0] : '';
    }
    return '';
  };
  return (
    <Grid container item md={10} xs={12} sx={{ backgroundColor: BACKGROUND_WHITE }} borderRadius={'8px'}>
      <Grid
        item
        container
        md={12}
        display={'flex'}
        alignItems={'center '}
        px={2}
        style={{ background: 'linear-gradient(135deg, #61D982, #FF6347)', borderTopRightRadius: '8px', borderTopLeftRadius: '8px' }}
      >
        <BookIcon fontSize="large" sx={{ color: BACKGROUND_DEFAULT }} />
        <Typography ml={1} variant="h4" gutterBottom mb={0} pt={2} pb={2} textAlign={'center'}>
          Gợi ý cho bạn
        </Typography>
      </Grid>

      {isLoadingBook ? (
        <Loading />
      ) : (
        <Grid container mt={2}>
          {books?.data?.rows?.map((item) => (
            <Grid key={item?.id} item xs={6} sm={4} md={2} className="Button_Hover btn-boxshadown custom-padding" p={0}>
              <ListProducts
                slug={item?.slug}
                image={getImage(item)}
                title={item.name}
                price={formatPrice(item.price || 0)}
                sale={'0%'}
                oldPrice={formatPrice(item.price || 0)}
                star={5}
                sold={1200}
              />
            </Grid>
          ))}
          {books?.data?.rows?.map((item) => (
            <Grid key={item?.id} item xs={6} sm={4} md={2} className="Button_Hover btn-boxshadown custom-padding" p={0}>
              <ListProducts
                slug={item?.slug}
                image={getImage(item)}
                title={item.name}
                price={formatPrice(item.price || 0)}
                sale={'0%'}
                oldPrice={formatPrice(item.price || 0)}
                star={5}
                sold={1200}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
}

export default memo(MyListProducts);
