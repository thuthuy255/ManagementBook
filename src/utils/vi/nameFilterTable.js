export const NameFilter = {
  // 🟢 Phần Sort (Sắp xếp)
  columnMenuSortAsc: 'Sắp xếp tăng dần',
  columnMenuSortDesc: 'Sắp xếp giảm dần',
  columnMenuUnsort: 'Bỏ sắp xếp',

  // 🔵 Phần Filter (Lọc dữ liệu)
  columnMenuFilter: 'Lọc dữ liệu',
  filterPanelColumns: 'Cột',
  filterPanelOperator: 'Toán tử',
  filterPanelInputLabel: 'Giá trị',
  filterOperatorContains: 'Chứa',
  filterOperatorDoesNotContain: 'Không chứa', // 🔥 Bổ sung
  filterOperatorEquals: 'Bằng',
  filterOperatorDoesNotEqual: 'Không bằng', // 🔥 Bổ sung
  filterOperatorStartsWith: 'Bắt đầu với',
  filterOperatorEndsWith: 'Kết thúc với',
  filterOperatorIsEmpty: 'Rỗng',
  filterOperatorIsNotEmpty: 'Không rỗng',
  filterOperatorGreaterThan: 'Lớn hơn',
  filterOperatorLessThan: 'Nhỏ hơn',
  filterOperatorGreaterThanOrEqual: 'Lớn hơn hoặc bằng',
  filterOperatorLessThanOrEqual: 'Nhỏ hơn hoặc bằng',
  filterOperatorIsAnyOf: 'Là một trong số', // 🔥 Bổ sung

  // 🟡 Phần Column Menu (Menu cột)
  columnMenuHideColumn: 'Ẩn cột',
  columnMenuShowColumns: 'Hiển thị cột',

  // 🔴 Pagination (Phân trang)
  toolbarDensity: 'Mật độ',
  toolbarDensityCompact: 'Nhỏ gọn',
  toolbarDensityStandard: 'Chuẩn',
  toolbarDensityComfortable: 'Thoải mái',

  // 🟠 Không có dữ liệu
  noRowsLabel: 'Không có dữ liệu',
  noResultsOverlayLabel: 'Không tìm thấy kết quả nào',

  columnMenuManageColumns: 'Quản lý cột', // 🔥 Nếu có trong menu
  toolbarManageColumns: 'Quản lý cột hiển thị', // 🔥 Nếu xuất hiện trong toolbar,
  footerRowSelected: (count) => (count > 1 ? `${count} hàng đã chọn` : `${count} hàng được chọn`),
  footerTotalRows: 'Tổng số dòng:',
  footerPaginationRowsPerPage: 'Số dòng mỗi trang:',
  footerPagination: (count) => `1–${count} của ${count}`,
  MuiTablePagination: {
    labelRowsPerPage: 'Số hàng trên trang:',
    labelDisplayedRows: ({ from, to, count }) => `${from}–${to} trên ${count}`
  }
};
