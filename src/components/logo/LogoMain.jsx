import { useTheme } from '@mui/material/styles';
import './LogoMain.css';

const Logo = ({ width }) => {  // Destructure width từ props
  const theme = useTheme();

  return (
    <div className="image_logo" style={{ width: width }}></div>
  );
};

export default Logo;
