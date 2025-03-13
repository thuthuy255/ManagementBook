import { useRef } from 'react';
import { Grid, Button, Card, CardMedia, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

function ImageUploader({ images = [], setImages, multiple = true, error }) {
  const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const currentImage = [...images, ...files];
      setImages(currentImage);
    }
    event.target.value = ''; // Reset input
  };

  const handleRemoveImage = (indexImage) => {
    if (images) {
      const currentImage = images?.filter((item, index) => index !== indexImage);
      setImages(currentImage);
    }
  };

  return (
    <>
      <Grid container spacing={2} mt={1} alignItems="center">
        {images.length > 0 &&
          images?.map((file, index) => (
            <Grid item key={index}>
              <Card sx={{ position: 'relative', width: 100, height: 100 }}>
                <CardMedia
                  component="img"
                  height="100"
                  image={typeof file === 'string' ? file : URL.createObjectURL(file)}
                  alt={`Ảnh ${index + 1}`}
                />
                <IconButton
                  size="small"
                  sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'rgba(255,255,255,0.7)' }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <CloseIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}

        {/* Button thêm ảnh */}
        <Grid item>
          <Button
            variant="outlined"
            sx={{
              height: 100,
              width: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleFileInputClick}
          >
            <AddIcon />
          </Button>
        </Grid>

        {/* Input file ẩn */}
        <input ref={fileInputRef} accept="image/*" type="file" hidden multiple={multiple} onChange={handleFileChange} />
      </Grid>

      {/* Hiển thị lỗi nếu có */}
      {error && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </>
  );
}

export default ImageUploader;
