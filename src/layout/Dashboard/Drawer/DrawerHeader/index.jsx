import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/logo';
import { Image } from '@mui/icons-material';
import logoAdmin from 'assets/images/icons/logo_admin.webp';
// ==============================|| DRAWER HEADER ||============================== //

export default function DrawerHeader({ open }) {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={!!open}>
      {/* <Logo isIcon={!open} sx={{ width: open ? 'auto' : 35, height: 35 }} /> */}
      <img src={logoAdmin} width={200} />
    </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = { open: PropTypes.bool };
