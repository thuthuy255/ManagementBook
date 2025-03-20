import { Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ListPostManagement from './ListPostManagement';
import { Link, useNavigate } from 'react-router-dom';
import HeaderTable from 'components/table/headerTable/HeaderTable';

export default function PostManagement() {
  return (
    <div>
      <ListPostManagement />
    </div>
  );
}
