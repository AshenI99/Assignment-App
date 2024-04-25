import ReactApexChart from "react-apexcharts";
import {Card, CardBody} from "react-bootstrap";

import "./chart.css";

/* Chart Options. Chart styles can be customized here */
const chartOptions = {
    chart: {
        foreColor: '#AAAAAA',
        type: "area",
        toolbar: {
            show: false,
        }
    },
    grid: {
        borderColor: '#AAAAAA54',
    },
    xaxis: {
        type: "datetime",
    },
    colors: ["#34C38F"],
    dataLabels: {
        enabled: false,
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.6,
            opacityTo: 0.05,
            stops: [42, 100, 100, 100],
        },
        colors: ["#34C38F"],
    },
    markers: {
        size: 3,
        strokeWidth: 3,
        strokeColors: "#34C38F",
        colors: "#34C38F",
    },
    stroke: {
        width: 2
    },
    legend: {
        show: false,
    },
}

const Chart = ({data, color, topic}) => {

    return (
        <Card className='shadow-none p-3 chart-card'>
            <CardBody>
                <div>
                    <div className='fw-medium text-white mb-4'>{topic}</div>
                </div>

                <ReactApexChart
                    options={{
                        ...chartOptions,
                        colors: [color],
                        fill: {
                            ...chartOptions.fill,
                            colors: [color]
                        },
                        markers: {
                            ...chartOptions.markers,
                            strokeColors: [color],
                            colors: [color],
                        }
                    }}
                    series={[{data: data}]}
                    type="area"
                    height={300}
                    width={"100%"}
                    id="chart-container"
                />
            </CardBody>
        </Card>
    )
}

export default Chart;