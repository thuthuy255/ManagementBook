import { List, ListItem, ListItemText, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategory } from 'services/clients/product';
import { useProduct } from '../pages/product/context/ProductContext';

const slugify = (str) => {
  return str
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
};

const CategoryPage = () => {
  const { fetchProducts } = useProduct();
  const [searchParams, setSearchParams] = useSearchParams();
  const [menus, setMenus] = useState([]);
  const [activeSlug, setActiveSlug] = useState(searchParams.get('type') || '');

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await getCategory();
        const data = response.data.rows || [];
        const formatMenus = [
          {
            name: 'Tất cả sản phẩm',
            path: '/product',
            slug: '',
            img: 'https://res.cloudinary.com/dw9w3kc49/image/upload/v1741236534/user/wurlnjck6wjnnbwcfojn.png'
          },
          ...data.map((item) => ({
            name: item.type,
            path: `/product?type=${slugify(item.type)}`,
            slug: slugify(item.type),
            img: item?.img
          }))
        ];

        setMenus(formatMenus);
      } catch (error) {
        console.error('Lỗi gọi API: ', error);
      }
    };

    fetchMenus();
  }, []);

  useEffect(() => {
    const slug = searchParams.get('type') || '';
    setActiveSlug(slug);
    fetchProducts({ type: slug });
  }, [searchParams]);

  const handleClick = (slug) => {
    setSearchParams(slug ? { type: slug } : {});
  };

  return (
    <Box sx={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <List>
        {menus.map((menu, index) => (
          <ListItem
            button
            key={index}
            sx={{
              borderRadius: 2,
              mb: 1,
              bgcolor: activeSlug === menu.slug ? '#e0f7fa' : 'transparent',
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
            onClick={() => handleClick(menu.slug)}
          >
            <Link to={menu.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <Box sx={{ gap: 1, display: 'flex', justifyContent: 'space-between' }}>
                <img src={menu.img} alt={menu.name} style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }} />
                <ListItemText primary={menu.name} />
              </Box>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CategoryPage;
