import { useState } from 'react';

// Hook tùy chỉnh để xử lý menu
const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  return {
    anchorEl,
    open: Boolean(anchorEl),
    handleOpen: (event) => setAnchorEl(event.currentTarget),
    handleClose: () => setAnchorEl(null)
  };
};
export default useMenu;
