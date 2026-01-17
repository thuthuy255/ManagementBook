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
import { addCategory, getProducts, getRatesByProduct, createRate } from 'services/clients/product';
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';
import slugPram from 'slug';
import { formatPrice } from 'utils/format';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { showToast } from 'components/notification/CustomToast';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BACKGROUND_DEFAULT } from 'constants/Color';
import { useQueryClient } from 'react-query';
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
  const queryClient = useQueryClient();
  const [ratings, setRatings] = useState([]);
  const [ratingValue, setRatingValue] = useState(5);
  const [comment, setComment] = useState('');
  useEffect(() => {
    async function fetchBook() {
      const response = await getProducts({ slug });
      if (response?.data?.rows?.length) {
        const bookData = response.data.rows[0];
        const images = typeof bookData.img_src === 'string'
          ? JSON.parse(bookData.img_src)
          : bookData.img_src;
        setBook(bookData);
        setSelectedImage(images[0]);

        // Fetch ratings for the product
        const ratingResponse = await getRatesByProduct({ productID: bookData.id });
        if (ratingResponse?.err === 0) {
          setRatings(ratingResponse?.data?.rows || []);
        }
      }
    }
    fetchBook();
  }, [slug]);
  const images = book ? (typeof book.img_src === 'string' ? JSON.parse(book.img_src) : book.img_src) : [];
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
  const navigate = useNavigate();
  const handleAddToCart = async () => {
    const payload = { productID: book?.id, qty: quantity };

    const response = await addCategory(payload);
    if (response?.err === 0) {
      await queryClient.invalidateQueries(['getListCartQuery']);
      navigate('/Cart');

      showToast(response?.mess, 'success');
    } else {
      showToast(response?.mess, 'warning');
    }
  };

  const handleSubmitRate = async () => {
    if (!localStorage.getItem('token')) {
      showToast('Vui lòng đăng nhập để đánh giá', 'warning');
      return;
    }

    const payload = {
      productID: book?.id,
      score: ratingValue,
      content: comment
    };

    const response = await createRate(payload);
    if (response?.err === 0) {
      showToast('Đánh giá của bạn đã được gửi', 'success');
      setComment('');
      setRatingValue(5);

      // Refresh ratings
      const ratingResponse = await getRatesByProduct({ productID: book.id });
      if (ratingResponse?.err === 0) {
        setRatings(ratingResponse?.data?.rows || []);
      }
    } else {
      showToast(response?.mess || 'Có lỗi xảy ra', 'warning');
    }
  };
  return (
    <Grid container sx={{ minHeight: 'calc(100vh - 100px)' }} pb={'60px'} pt={2} style={{ margin: '0 auto', width: '80vw' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'sticky', top: 100, alignSelf: 'flex-start' }}>
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
                  mt: 2
                  // overflowX: 'auto',
                  // whiteSpace: 'nowrap'
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
                {/* <TextField
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  size="small"
                  sx={{ width: 80 }}
                  inputProps={{ min: 1 }}
                /> */}

                <Grid container justifyContent={'space-between'} alignItems={'center'}>
                  <Grid container spacing={1}>
                    {/* Thêm vào giỏ hàng */}
                    <Grid container spacing={1}>
                      {/* Thêm vào giỏ hàng */}
                      <Grid item xs={12} md={6}>
                        <Button
                          onClick={handleAddToCart}
                          fullWidth
                          variant="outlined"
                          sx={{
                            borderColor: BACKGROUND_DEFAULT,
                            borderWidth: '2px',
                            color: BACKGROUND_DEFAULT,
                            borderRadius: '8px',
                            padding: '10px 0',
                            '&:hover': {
                              borderColor: BACKGROUND_DEFAULT, // Giữ màu viền khi hover
                              borderWidth: '2px', // Fix lỗi viền bị thay đổi khi hover
                              backgroundColor: 'transparent', // Không đổi màu nền khi hover
                              color: BACKGROUND_DEFAULT // Giữ nguyên màu chữ
                            }
                          }}
                        >
                          <ShoppingCartIcon />
                          <Typography color={BACKGROUND_DEFAULT} gutterBottom mb={0}>
                            Thêm vào giỏ hàng
                          </Typography>
                        </Button>
                      </Grid>

                      {/* Mua ngay */}
                      <Grid item xs={12} md={6}>
                        <Button
                          fullWidth
                          onClick={handleAddToCart}
                          variant="outlined"
                          sx={{
                            backgroundColor: BACKGROUND_DEFAULT,
                            borderColor: BACKGROUND_DEFAULT,
                            color: 'white',
                            borderRadius: '8px',
                            borderWidth: '2px', // Fix lỗi viền bị thay đổi khi hover
                            padding: '10px 0',
                            '&:hover': {
                              borderColor: BACKGROUND_DEFAULT, // Giữ màu viền khi hover
                              borderWidth: '2px', // Fix lỗi viền bị thay đổi khi hover
                              backgroundColor: 'transparent', // Không đổi màu nền khi hover
                              color: BACKGROUND_DEFAULT // Giữ nguyên màu chữ
                            }
                          }}
                        >
                          Mua ngay
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
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
                    <Rating
                      value={ratings.length > 0 ? ratings.reduce((acc, r) => acc + r.score, 0) / ratings.length : 0}
                      readOnly
                      size="small"
                      precision={0.5}
                    />
                    <Typography variant="body2" color="orange">
                      ({ratings.length} đánh giá)
                    </Typography>
                    <Typography variant="body2" color="gray">
                      | {book?.sold} đã bán
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

              {/* Ratings Section */}
              <Item sx={{ marginTop: 4, p: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Đánh giá sản phẩm
                </Typography>

                {/* Display existing ratings */}
                {ratings.length > 0 ? (
                  <Box sx={{ mb: 3 }}>
                    {ratings.map((rating, index) => (
                      <Box key={index} sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {rating.user?.name || 'Người dùng'}
                          </Typography>
                          <Rating value={rating.score} readOnly size="small" />
                        </Stack>
                        <Typography variant="body2" color="textSecondary">
                          {rating.content}
                        </Typography>
                        <Typography variant="caption" color="gray" sx={{ mt: 0.5, display: 'block' }}>
                          {new Date(rating.createdAt).toLocaleDateString('vi-VN')}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="gray" mb={2}>
                    Chưa có đánh giá nào.
                  </Typography>
                )}


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
    </Grid>
  );
}
