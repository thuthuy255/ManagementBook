import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Stack,
  Container,
  Skeleton,
  Rating,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TextField,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addCategory, getProducts } from 'services/clients/product';
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';
import slugPram from 'slug';
import { formatPrice } from 'utils/format';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { showToast } from 'components/notification/CustomToast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Item = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3]
}));

export default function ProductDetailLayout() {
  const { slug } = useParams();
  const [book, setBook] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const navigator = useNavigate();
  useEffect(() => {
    async function fetchBook() {
      const response = await getProducts({ slug });
      if (response?.data?.rows?.length) {
        const bookData = response.data.rows[0];
        const images = JSON.parse(bookData.img_src);
        setBook(bookData);
        setSelectedImage(images[0]);
      }
    }
    fetchBook();
  }, [slug]);
  const images = book ? JSON.parse(book.img_src) : [];
  const details = [
    { label: 'Mã hàng', value: book?.id },
    {
      label: 'Tên Nhà Cung Cấp',
      value: book?.publisher ? (
        <Link to={`product?publisher=${slugPram(book.publisher)}`} underline="hover">
          {book.publisher}
        </Link>
      ) : (
        'Đang cập nhật'
      )
    },
    { label: 'Tác giả', value: book?.author },
    { label: 'NXB', value: book?.publisher },
    { label: 'Hình thức', value: 'Bìa Mềm' },
    { label: 'Số lượng kho', value: book?.qty }
  ];
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1);
    console.log(value);
    setQuantity(value);
  };
  const handleAddToCart = async () => {
    const payload = { productID: book?.id, qty: quantity };
    const response = await addCategory(payload);
    const { err, mess } = response;
    if (response) return showToast(mess, err === 0 ? 'success' : 'error');
  };
  return (
    <Container sx={{ height: '500vh' }}>
      <Button
        variant="outlined"
        onClick={() => navigator(-1)}
        style={{ marginTop: '10px', marginBottom: '10px', border: 'none', color: 'red' }}
      >
        <ArrowBackIcon />
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'sticky', top: 32, alignSelf: 'flex-start' }}>
            {' '}
            <Card sx={{ p: 1, textAlign: 'center' }}>
              {book ? (
                <CardMedia
                  component="img"
                  image={selectedImage}
                  alt={book.title}
                  sx={{
                    cursor: 'pointer',
                    width: '100%',
                    height: { xs: 150, sm: 300, md: 350 },
                    objectFit: 'contain',
                    borderRadius: 2
                  }}
                  onClick={() => {
                    setOpen(true);
                    setLightboxIndex(images.indexOf(selectedImage));
                  }}
                />
              ) : (
                <Skeleton variant="rectangular" width="100%" height={500} />
              )}

              <Stack
                direction="row"
                sx={{
                  p: 1,
                  mt: 2,
                  overflowX: 'auto',
                  whiteSpace: 'nowrap'
                }}
                spacing={1}
                justifyContent="center"
              >
                {book
                  ? images.map((img, index) => (
                      <CardMedia
                        key={index}
                        component="img"
                        image={img}
                        alt={`Thumbnail ${index}`}
                        sx={{
                          width: { xs: 60, sm: 100, md: 120 },
                          height: { xs: 60, sm: 100, md: 120 },
                          cursor: 'pointer',
                          borderRadius: 1,
                          objectFit: 'contain',
                          boxShadow: img === selectedImage ? '0 0 4px blue' : 'none',
                          transition: 'all 0.3s',
                          '&:hover': { transform: 'scale(1.1)' }
                        }}
                        onClick={() => {
                          setSelectedImage(img);
                          setLightboxIndex(index);
                        }}
                      />
                    ))
                  : [...Array(4)].map((_, index) => <Skeleton key={index} variant="circular" width={60} height={60} />)}
              </Stack>
            </Card>
            <Lightbox open={open} close={() => setOpen(false)} slides={images.map((img) => ({ src: img }))} index={lightboxIndex} />
            <Item>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%' }}>
                <TextField
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  size="small"
                  sx={{ width: 80 }}
                  inputProps={{ min: 1 }}
                />

                <Button
                  variant="outlined"
                  onClick={handleAddToCart}
                  sx={{
                    borderColor: 'red',
                    color: 'red',
                    minWidth: 50,
                    flex: 1,
                    '&:hover': { backgroundColor: '#ffebeb', borderColor: 'red' }
                  }}
                >
                  <ShoppingCartIcon />
                </Button>

                <Link to="/cart" style={{ textDecoration: 'none', flex: 3 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'red',
                      color: 'white',
                      width: '100%',
                      '&:hover': { backgroundColor: '#c62828' }
                    }}
                  >
                    Mua ngay
                  </Button>{' '}
                </Link>
              </Stack>
            </Item>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          {book ? (
            <>
              <Item>
                <Box sx={{ p: 1 }}>
                  <Typography variant="h3" gutterBottom>
                    {book.name}
                  </Typography>
                  <Typography variant="h2" color="red">
                    {formatPrice(book.price)}
                  </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2">
                          Nhà cung cấp:{' '}
                          <Link to={``} color="primary">
                            {book?.publisher}
                          </Link>
                        </Typography>
                        <Typography variant="body2">
                          Nhà xuất bản: <b>{book?.publisher}</b>
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <Typography variant="body2">
                          Tác giả: <b>{book?.author}</b>
                        </Typography>
                        <Typography variant="body2">
                          Hình thức bìa: <b>Bìa Mềm</b>
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                    <Rating value={0} readOnly size="small" />
                    <Typography variant="body2" color="orange">
                      (0 đánh giá)
                    </Typography>
                    <Typography variant="body2" color="gray">
                      | {book?.sold}
                    </Typography>
                  </Stack>
                </Box>
              </Item>
              <Item sx={{ marginTop: 4, p: 2 }}>
                <TableContainer component={Paper} sx={{ mt: 2, p: 0, boxShadow: 0 }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Thông tin chi tiết
                  </Typography>
                  <Table>
                    <TableBody>
                      {details?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>{item.label}</TableCell>
                          <TableCell sx={{ whiteSpace: 'pre-line' }}>{item.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Item>
              <Item sx={{ marginTop: 4, p: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Mô tả sản phẩm
                </Typography>
                <Typography
                  sx={{
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-word'
                  }}
                  mt={2}
                  color="textSecondary"
                >
                  {book.description}
                </Typography>
              </Item>
            </>
          ) : (
            <>
              <Skeleton variant="text" width="70%" height={40} />
              <Skeleton variant="text" width="50%" height={30} />
              <Skeleton variant="rectangular" width="100%" height={100} />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
