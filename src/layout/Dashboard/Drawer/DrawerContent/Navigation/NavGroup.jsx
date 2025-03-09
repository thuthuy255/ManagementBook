import PropTypes from 'prop-types';
// material-ui
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';
import { useCallback, useState } from 'react';
import { Menu } from '@mui/base';
import { useSelector } from 'react-redux';
import { getRole_Id } from 'features/slices/app.slice';

export default function NavGroup({ item }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const [anchorEl, setAnchorEl] = useState(null);
  const role_id = useSelector(getRole_Id);
  const handleToggleDrawer = useCallback(() => {
    setAnchorEl((prev) => !prev);
  }, []);

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
            collapse - only available in paid version
          </Typography>
        );
      case 'item':
        if (!menuItem.requiredRole || menuItem.requiredRole === role_id) {
          return <NavItem key={menuItem.id} item={menuItem} level={1} />;
        }
        break;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary" sx={{ cursor: 'pointer' }}>
              {item.title}
            </Typography>
            {/* only available in paid version */}
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {/* Dropdown Menu */}
      {navCollapse}
      {/* {navCollapse} */}
    </List>
  );
}

NavGroup.propTypes = { item: PropTypes.object };
