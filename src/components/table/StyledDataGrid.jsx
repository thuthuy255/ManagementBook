import { DataGrid } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import './StyledDataGrid.css';
import { NameFilter } from 'utils/vi/nameFilterTable';

export default function StyledDataGrid({
  rows,
  columns,
  paginationModel = { page: 1, pageSize: 5 },
  onPaginationChange,
  rowCount = 0,
  paginationMode = 'server',
  onSelectedIdsChange,
  getRowId = (row) => row.id || row.name
}) {
  return (
    <Paper
      elevation={3} // Tạo hiệu ứng đổ bóng nhẹ
      sx={{
        width: '100%',
        borderRadius: 2,
        bgcolor: '#fff',
        border: '2px solid var(--primary-color-lighter)',
        boxShadow: 'none'
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns.map((col) => ({
          ...col,
          headerClassName: 'custom-header' // Tạo class tùy chỉnh cho header
        }))}
        getRowId={getRowId}
        getRowHeight={() => 'auto'}
        pageSizeOptions={[5]}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationChange}
        rowCount={paginationMode === 'server' ? rowCount : undefined}
        paginationMode="server"
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={onSelectedIdsChange}
        localeText={NameFilter}
        sx={{
          border: 0,

          '& .custom-header': {
            backgroundColor: 'var(--primary-color-lighter)', // Dùng màu từ :root
            color: '#fff'
          },
          '& .MuiDataGrid-columnHeaders': {
            color: 'var(--text-color)', // Dùng màu chữ từ :root
            fontSize: '14px',
            fontWeight: 'bold',
            textAlign: 'center'
          },
          // Tùy chỉnh từng ô trong header
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            textAlign: 'center'
          },
          // Bo góc trên cho header
          '& .MuiDataGrid-columnHeadersInner': {
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            overflow: 'hidden'
          },
          '& .MuiDataGrid-columnHeaderCheckbox': {
            backgroundColor: 'var(--primary-color-lighter)', // Nền của ô checkbox trong header
            borderColor: '#fff',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          '& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root': {
            color: '#fff' // Màu icon checkbox
          },
          '& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)' // Màu hover của checkbox
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          },
          '& .MuiDataGrid-menuIconButton': {
            opacity: 1, // 🔥 Luôn hiển thị icon menu (3 chấm)
            visibility: 'visible'
          },
          '& .MuiDataGrid-sortIcon': {
            opacity: 1, // 🔥 Luôn hiển thị icon sắp xếp (mũi tên)
            visibility: 'visible'
          },
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none' // 🔥 Bỏ viền focus mặc định
          }
        }}
      />
    </Paper>
  );
}
