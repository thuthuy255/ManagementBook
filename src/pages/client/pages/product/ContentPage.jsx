import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Drawer,
  Box,
  CircularProgress,
  Grid,
  Skeleton
} from '@mui/material';
import { ShoppingCart, Visibility, FilterList } from '@mui/icons-material';
import { useProduct } from './context/ProductContext';
import { formatPrice } from 'utils/format';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function ContentPage() {
  const { products, totalPage, addToCart, fetchProducts, loading } = useProduct();
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observer = useRef(null);
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: '',
    priceRange: [0, 999999999],
    sort: '',
    type: ''
  });

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const urlType = searchParams.get('type') || '';
    const updatedFilters = { ...filters, type: urlType };
    setFilters(updatedFilters);
    setPage(1);
    setHasMore(true);
    fetchWithFilters(1, false, updatedFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    if (!loading) {
      if (page === 1) {
        setAllProducts(products);
      } else {
        setAllProducts((prev) => [...prev, ...products]);
      }
      setHasMore(page < totalPage);
      setLoadingMore(false);
    }
  }, [products, loading, page, totalPage]);

  const fetchWithFilters = (targetPage, append = false, customFilters = null) => {
    const usedFilters = customFilters || filters;
    const payload = {
      keyword: usedFilters.search,
      minPrice: usedFilters.priceRange[0],
      maxPrice: usedFilters.priceRange[1],
      sort: usedFilters.sort,
      type: usedFilters.type,
      page: targetPage
    };
    fetchProducts(payload, append);
  };

  const handleFilterSubmit = () => {
    setPage(1);
    setHasMore(true);
    fetchWithFilters(1, false);
    setOpenDrawer(false);
  };

  const loadMore = useCallback(() => {
    if (!loading && !loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadingMore(true);
      fetchWithFilters(nextPage, true);
    }
  }, [loading, loadingMore, hasMore, page, filters]);

  const lastProductRef = useCallback(
    (node) => {
      if (loading || loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loadingMore, hasMore, loadMore]
  );

  const handleSearchChange = (e) => setFilters({ ...filters, search: e.target.value });
  const handleSliderChange = (e, newValue) => setFilters({ ...filters, priceRange: newValue });
  const handleSortChange = (e) => setFilters({ ...filters, sort: e.target.value });

  const getImage = (product) => {
    if (product.img_src) {
      const images = JSON.parse(product.img_src);
      return images?.length ? images[0] : '';
    }
    return '';
  };

  return (
    <Box sx={{ px: 4, py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="outlined" startIcon={<FilterList />} onClick={() => setOpenDrawer(true)}>
          Bộ lọc
        </Button>
      </Box>

      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6">Bộ lọc sản phẩm</Typography>

          <TextField label="Tìm kiếm" fullWidth margin="normal" value={filters.search} onChange={handleSearchChange} />

          <Typography gutterBottom sx={{ mt: 2 }}>
            Khoảng giá
          </Typography>
          <Slider value={filters.priceRange} onChange={handleSliderChange} min={0} max={1000000} step={10000} valueLabelDisplay="auto" />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Giá</InputLabel>
            <Select value={filters.sort} onChange={handleSortChange} label="Giá">
              <MenuItem value="asc">Tăng dần</MenuItem>
              <MenuItem value="desc">Giảm dần</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleFilterSubmit}>
            Áp dụng
          </Button>
        </Box>
      </Drawer>

      {loading && page === 1 ? (
        <Grid container spacing={2}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
              <Skeleton height={30} sx={{ mt: 1, borderRadius: 1 }} />
              <Skeleton height={20} width="60%" sx={{ mt: 0.5, borderRadius: 1 }} />
            </Grid>
          ))}
        </Grid>
      ) : allProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h6">Không có sản phẩm nào</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {allProducts.map((product, index) => {
            const isLast = index === allProducts.length - 1;
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} ref={isLast ? lastProductRef : null}>
                <Card>
                  <CardMedia component="img" height="200" image={getImage(product)} alt={product.name} />
                  <CardContent>
                    <Typography gutterBottom variant="h6" noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {formatPrice(product.price)}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <IconButton onClick={() => addToCart(product)}>
                        <ShoppingCart />
                      </IconButton>
                      <IconButton component={Link} to={`/product/${product.slug}`}>
                        <Visibility />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {loadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
