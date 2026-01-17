import { Grid, Typography } from '@mui/material';
import { BACKGROUND_DEFAULT, BACKGROUND_WHITE } from 'constants/Color';
import React, { memo, useState, useEffect } from 'react';
import BookIcon from '@mui/icons-material/Book';
import ListProducts from './ListProducts';
import Loading from 'components/loading/Loading';
import { formatPrice } from 'utils/format';
import { getSuggestProduct } from 'services/clients/product';
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

  const [books, setBooks] = useState([]);
  const [isLoadingBook, setIsLoadingBook] = useState(true);

  useEffect(() => {
    async function fetchSuggestedProducts() {
      setIsLoadingBook(true);
      try {
        const response = await getSuggestProduct(searchProducts);
        if (response?.err === 0) {
          setBooks(response?.data?.rows || []);
        }
      } catch (error) {
        console.error('Error fetching suggested products:', error);
      } finally {
        setIsLoadingBook(false);
      }
    }
    fetchSuggestedProducts();
  }, [searchProducts]);

  const getImage = (product) => {
    if (product.img_src) {
      const images = typeof product.img_src === 'string'
        ? JSON.parse(product.img_src)
        : product.img_src;
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
          {books?.map((item) => (
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
          {books?.map((item) => (
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
