import { IconButton, Tooltip } from '@mui/material';
import React, { memo, useState } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
function ButtonFullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullScreen(true));
    } else if (document.exitFullscreen) {
      document.exitFullscreen().then(() => setIsFullScreen(false));
    }
  };

  //   return <button onClick={toggleFullScreen}>{isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}</button>;
  return (
    <Tooltip title="Toàn màn hình" placement="top">
      <IconButton onClick={toggleFullScreen} sx={{ color: '#fff' }} size="small">
        {isFullScreen ?  <FullscreenExitIcon fontSize="medium" />:<FullscreenIcon fontSize="medium" /> }
      </IconButton>
    </Tooltip>
  );
}

export default memo(ButtonFullScreen);
