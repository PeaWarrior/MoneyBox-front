import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Chart, Line } from 'react-chartjs-2';
import { Row, Container } from 'react-bootstrap';
import moment from 'moment';
import { getIntradayPricesRequest } from '../../api';
import { calculateChange } from './stockActions';

export default function StockChart({ ticker, currentPrice, openPrice, lastMinute }) {
    const dispatch = useDispatch();
    const [graphData, setGraphData] = useState({});
    const [price, setPrice] = useState(currentPrice);
    const [currentChange, setCurrentChange] = useState({});
    const [time, setTime] = useState(moment().format('hh:mm A'));
    const [date, setDate] = useState(null);

    const times = Array.from({
        length: 391
        }, 
        (_, minute) => moment({
            hour: Math.floor(((minute + 30) / 60) + 9),
            minutes: (minute+30) % 60
            }).format('hh:mm A')
    );

    useEffect(() => {
        if (graphData.datasets.length) {
            const updatedPrices = graphData.datasets[0].data.map((price,index) => {
                if (index === graphData.datasets[0].data.length -1 ) {
                    return currentPrice
                } else {
                    return price
                }
            })
            setGraphData(prevState => ({
                ...prevState,
                datasets: [{
                    ...prevState.datasets[0],
                    data: [
                        ...updatedPrices
                    ]
                }]
            }));
        }
    }, [currentPrice])

    useEffect(() => {
        if (graphData.datasets.length) {
            setGraphData(prevState => ({
                ...prevState,
                datasets: [{
                    ...prevState.datasets[0],
                    data: [
                        ...prevState.datasets[0].data,
                        currentPrice
                    ],
                    borderColor: (currentPrice > openPrice ? '#00ad00' : 'red')
                }]
            }));
            setTime(moment().format('hh:mm A'));
        }
    }, [lastMinute])

    useEffect(() => {
        setCurrentChange(dispatch(calculateChange(
            (price ? price : currentPrice), 
            openPrice
            )));
    }, [price, dispatch, openPrice]);

    useEffect(() => {
        const verticleLinePlugin = {
            afterDraw: function(chart, easing) {
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    const activePoint = chart.controller.tooltip._active[0];
                    const ctx = chart.ctx;
                    const x = activePoint.tooltipPosition().x;
                    const topY = chart.scales['y-axis-0'].top;
                    const bottomY = chart.scales['y-axis-0'].bottom;
        
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'grey';
                    ctx.stroke();
                    ctx.restore();
                }
            }
          }
        Chart.pluginService.register(verticleLinePlugin);
        return () => {
            Chart.pluginService.unregister(verticleLinePlugin);
        }
    }, [])

    useEffect(() => {
        if (ticker) {
            getIntradayPricesRequest(ticker)
            .then(data => {
                let prevPrice;
                const prices = data.map(intradayTrade => {
                    if (intradayTrade.average) {
                        prevPrice = intradayTrade.average
                        return prevPrice
                    } else {
                        return prevPrice
                    }
                });
                setGraphData({
                    labels: times,
                    datasets: [{
                        data: prices,
                        clip: 0,
                        fill: false,
                        lineTension: 0.1,
                        borderColor: '#00ad00',
                        borderCapStyle: 'round',
                        pointRadius: 0
                    }]
                });
                setDate(moment(data[0].date).format('MMM D, YYYY'));
            })
        }
    }, [ticker]);

    const graphOptions = {
        animation: false,
        legend: {display: false},
        maintainAspectRatio: true,
        aspectRatio: 2,
        responsive: true,
        responsiveAnimationDuration: 0,
        tooltips: {
            enabled: false,
            mode: 'index',
            intersect: false,
            custom: (tooltipModel) => {
                if (tooltipModel.body === undefined) {
                    const currentTime = moment().format('hh:mm A');
                    setTime(currentTime)
                    setPrice(null);
                    return;
                }
                if (tooltipModel.dataPoints && !(moment(tooltipModel.dataPoints[0].label, "hh:mm A").format('mm') % 5)) {
                    setPrice((Math.round(tooltipModel.dataPoints[0].value*100)/100).toFixed(2));
                    setTime(tooltipModel.dataPoints[0].label);
                }
            }
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            yAxes: [{
                ticks: {
                    display: false,
                },
                gridLines: {
                    drawTicks: false,
                    drawOnChartArea: false,
                }
            }],
            xAxes: [{
                ticks: {
                    display: false,
                },
                gridLines: {
                    drawTicks: false,
                    drawOnChartArea: false
                }
            }]
        }
    }

    return (
        <>
            <Container>
            <Row>
                <small>{date}</small>
            </Row>
            <Row>
                <h3 className={`mb-0 ${currentChange.type === '+' ? 'pos' : 'neg'}`}>
                    ${price ? price : currentPrice}
                </h3>
            </Row>
            <Row>
                <small className={currentChange.type === '+' ? 'pos' : 'neg'}>
                    {currentChange.message}
                </small>
                <small className='ml-1'>{time}</small>
            </Row>
            </Container>
            <Line
                data={graphData}
                options={graphOptions}
            />
        </>
    )
}