// import React from 'react';
// import useAddPost from '../hook/useAddPost';
// import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
// import ImageUploader from 'components/uploadImage/ImageUploader';

// export default function AddPost() {
//   const { formik, posts } = useAddPost();
//   return (
//     <Box
//       sx={{
//         width: '100%', // Đảm bảo chiều rộng full
//         minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 220px)' },
//         backgroundImage:
//           "url('https://img.freepik.com/free-photo/creative-composition-with-different-books_23-2148851035.jpg?t=st=1741876625~exp=1741880225~hmac=f7cc2644ad029ded37764197ab98493ef367eb3734ae889c8e9fd21811fe81de&w=996')",
//         backgroundSize: 'cover', // Đảm bảo ảnh phủ full box
//         backgroundPosition: 'center',
//         display: 'flex', // Dùng flexbox
//         justifyContent: 'center',
//         alignItems: 'center'
//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: 'rgba(253, 253, 253, 0.93)', // Làm mờ nền form
//           padding: 4,
//           borderRadius: 2,
//           boxShadow: 3,
//           width: '30%'
//         }}
//       >
//         <Box>
//           <Typography variant="h3" textAlign="center" mb={2}>
//             Thêm bài viết
//           </Typography>
//           <TextField label="Tiêu đề bài viết" fullWidth margin="normal" />
//           <TextField label="Nội dung bài viết" fullWidth margin="normal" />
//           <TextField label="Thể loại bài viết" fullWidth margin="normal" />
//         </Box>
//         <Box>
//           <Grid item xs={12} md={12}>
//             <ImageUploader
//               images={formik.values.img_src || []}
//               setImages={(newImages) => formik.setFieldValue('img_src', newImages)}
//               multiple={true} // Hoặc false nếu chỉ chọn 1 ảnh
//             />
//           </Grid>
//         </Box>
//         <Box justifyContent={'center'} display="flex">
//           <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//             Xác nhận
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React from 'react';
import { Container, Button, Typography, Grid } from '@mui/material';
import CustomTextField from 'components/input/CustomTextField';
import InputSelect from 'components/input/InputSelect';
import ImageUploader from 'components/uploadImage/ImageUploader';
import Loading from 'components/loading/Loading';
import useAddPost from '../hook/useAddPost';

export default function AddPost() {
  const { formik, loading, categoryPost } = useAddPost();

  return (
    <Container maxWidth={false} disableGutters style={{ height: 'calc(100vh - 200px)' }}>
      <Grid container display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h4" gutterBottom mb={0}>
          Thêm bài viết
        </Typography>

        {loading ? (
          <Loading />
        ) : (
          <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit}>
            Xác nhận
          </Button>
        )}
      </Grid>

      <Grid container sx={{ flex: 1, minHeight: 0 }}>
        <Grid item xs={12} md={6}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CustomTextField formik={formik} name="title" label="Tiêu đề" />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputSelect
                  label="Loại bài viết"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={categoryPost} // Truyền danh sách loại sách vào
                  error={formik.touched.type && formik.errors.type}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <CustomTextField formik={formik} name="content" label="Nội dung" multiline />
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} md={6} px={4}>
          <Grid item xs={12} md={12}>
            <ImageUploader
              images={formik.values.img_src || []}
              setImages={(newImages) => formik.setFieldValue('img_src', newImages)}
              multiple={true}
              error={formik.errors.img_src}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
