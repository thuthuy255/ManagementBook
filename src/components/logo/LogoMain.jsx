import { useTheme } from '@mui/material/styles';
import './LogoMain.css';

const Logo = ({ width, height }) => {
  // Destructure width từ props
  const theme = useTheme();

  return <div className="image_logo" style={{ width: width, height: height }}></div>;
};

export default Logo;
