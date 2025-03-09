import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// Generate dynamic dates for the current year
const generateCurrentYearCategories = () => {
  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, ..., 12]
  return months.map((month) => new Date(currentYear, month - 1, 19).toISOString()); // Ngày 19 hàng tháng
};

// chart options
const areaChartOptions = {
  chart: {
    height: 340,
    type: 'line',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 1.5
  },
  grid: {
    strokeDashArray: 4
  },
  xaxis: {
    type: 'datetime',
    categories: generateCurrentYearCategories(),
    labels: {
      formatter: function (value) {
        const date = new Date(value);
        return date.toLocaleDateString('vi-VN', { month: 'short' }); // Hiển thị tên tháng
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  tooltip: {
    x: {
      formatter: function (value) {
        const date = new Date(value);
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
      }
    }
  }
};

// ==============================|| REPORT AREA CHART ||============================== //

export default function ReportAreaChart() {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.warning.main],
      xaxis: {
        ...prevState.xaxis,
        labels: {
          ...prevState.xaxis.labels,
          style: {
            colors: Array(12).fill(secondary) // Sử dụng màu theme cho tất cả nhãn
          }
        }
      },
      grid: {
        borderColor: line
      },
      legend: {
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [primary, secondary, line, theme]);

  const [series] = useState([
    {
      name: 'Series 1',
      data: [58, 115, 28, 83, 63, 75, 35, 55, 45, 65, 95, 85] // 12 giá trị cho từng tháng
    }
  ]);

  return <ReactApexChart options={options} series={series} type="line" height={340} />;
}
