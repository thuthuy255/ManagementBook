import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

const chartOptions = {
    chart: {
        height: 350,
        type: 'area',
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 3
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 90, 100]
        }
    },
    markers: {
        size: 4,
        strokeWidth: 2,
        hover: {
            size: 6
        }
    },
    xaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        labels: {
            formatter: (value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                return value;
            }
        }
    },
    grid: {
        borderColor: '#f1f1f1'
    },
    tooltip: {
        theme: 'light',
        x: {
            show: true
        }
    }
};

export default function StatsChart({ data, name, color }) {
    const theme = useTheme();
    const [options, setOptions] = useState(chartOptions);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const categories = data.map((item) => {
            const date = new Date(item.month);
            return `Th ${date.getMonth() + 1}`;
        });

        const values = data.map((item) => item.revenue || item.views || 0);

        setOptions((prev) => ({
            ...prev,
            colors: [color || theme.palette.primary.main],
            xaxis: {
                ...prev.xaxis,
                categories,
                labels: {
                    style: {
                        colors: theme.palette.text.secondary,
                        fontFamily: theme.typography.fontFamily
                    }
                }
            },
            yaxis: {
                ...prev.yaxis,
                labels: {
                    style: {
                        colors: theme.palette.text.secondary,
                        fontFamily: theme.typography.fontFamily
                    }
                }
            }
        }));

        setSeries([
            {
                name,
                data: values
            }
        ]);
    }, [data, name, color, theme]);

    return (
        <Box sx={{ py: 1 }}>
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </Box>
    );
}

StatsChart.propTypes = {
    data: PropTypes.array,
    name: PropTypes.string,
    color: PropTypes.string
};
