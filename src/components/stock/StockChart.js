import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chart, Line } from 'react-chartjs-2';
import { Row, Container, Button } from 'react-bootstrap';
import moment from 'moment';
import { calculateChange } from './stockActions';
import { setIntradayChart, setWeekChart, setPrices, setBorderColor } from './stockChartActions';

export default function StockChart({ ticker, openPrice, lastPrice }) {
    const dispatch = useDispatch();
    const { date, graphData } = useSelector(state => state.stockChart);
    const [lastTrade, setLastTrade] = useState({
        price: lastPrice,
        time: moment().format('hh:mm A')
    });
    const [option, setOption] = useState('intraday');
    const [displayPrice, setDisplayPrice] = useState(null);
    const [displayTime, setDisplayTime] = useState(null);
    const [currentChange, setCurrentChange] = useState({});

    useEffect(() => {
        if (ticker) {
            switch (option) {
                case 'intraday':
                    dispatch(setIntradayChart(ticker, openPrice));
                    break;
                case 'week':
                    dispatch(setWeekChart(ticker));
                    break;
                default:
                    break;
            }
        }
    }, [option, ticker, openPrice, dispatch]);

    useEffect(() => {
        if (ticker && moment().hour() < 16) {
            const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUBB_API_KEY}`);

            socket.addEventListener('open', function (event) {
                socket.send(JSON.stringify({'type':'subscribe', 'symbol': ticker}))
            });

            let mostRecentTrade;
    
            socket.addEventListener('message', function (event) {
                const message = JSON.parse(event.data);
                if (message.type === 'trade') {
                    mostRecentTrade = {
                        price: message.data[0].p.toFixed(2),
                        time: moment(message.data[0].t).format('hh:mm A')
                    }
                }
            });

            const interval = setInterval(() => {
                if (mostRecentTrade) {
                    setLastTrade(prevState => mostRecentTrade);
                }
            }, 1000);
            
            return () => {
                socket.close();
                clearInterval(interval)
            }
        }
    }, [ticker, lastPrice, openPrice, dispatch]);

    useEffect(() => {
        setLastTrade(prevState => ({
            price: lastPrice,
            time: moment().hour() <= 16 ? moment().format('hh:mm A') : '04:00 PM'
        }));
        setCurrentChange(dispatch(calculateChange(lastPrice, openPrice)));
    }, [ticker, lastPrice, openPrice, dispatch])

    useEffect(() => {
        const updatedPrices = [...graphData.datasets[0].data];
        if (updatedPrices[updatedPrices.length-1] === lastTrade.price) {
            updatedPrices[updatedPrices.length-1] = lastTrade.price;
            dispatch(setPrices(updatedPrices));
        }

        const borderColor = lastTrade.price > openPrice ? '#00ad00' : 'red';
        if (graphData.datasets[0].borderColor !== borderColor) {
            dispatch(setBorderColor(borderColor));
        }

    }, [lastTrade.price, graphData.datasets, openPrice, dispatch]);

    useEffect(() => {
        if (option === 'intraday' && graphData.datasets[0].data.length) {
            const updatedPrices = [...graphData.datasets[0].data, lastTrade.price]
            dispatch(setPrices(updatedPrices));
            setDisplayTime(moment().format('hh:mm A'));
        }
    }, [lastTrade.time, option, dispatch])

    useEffect(() => {
        setCurrentChange(dispatch(calculateChange(
            (displayPrice ? displayPrice : lastTrade.price), 
            openPrice
            )));
    }, [displayPrice, dispatch]);

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
                    const currentTime = moment()
                    const timeToDisplay = currentTime.hour() <= 16 ? currentTime.format('hh:mm A') : '04:00 PM'
                    setDisplayTime(timeToDisplay);
                    setDisplayPrice(null);
                    return;
                }
                if (tooltipModel.dataPoints && !(moment(tooltipModel.dataPoints[0].label, "hh:mm A").format('mm') % 5)) {
                    setDisplayPrice((Math.round(tooltipModel.dataPoints[0].value*100)/100).toFixed(2));
                    setDisplayTime(tooltipModel.dataPoints[0].label);
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

    const handleClick = event => {
        setOption(event.target.value);
    }

    return (
        <>
            <Container>
            <Row>
                <small>{date}</small>
            </Row>
            <Row>
                <h3 className={`mb-0 ${currentChange.type === '+' ? 'pos' : 'neg'}`}>
                    ${displayPrice ? displayPrice : lastTrade.price}
                </h3>
            </Row>
            <Row>
                <small className={currentChange.type === '+' ? 'pos' : 'neg'}>
                    {currentChange.message}
                </small>
                <small className='ml-1'>{displayTime ? displayTime : lastTrade.time}</small>
            </Row>
            </Container>
            <Line
                data={graphData}
                options={graphOptions}
            />
            <Row>
                <Button onClick={handleClick} variant='link' value="intraday">1D</Button>
                <Button onClick={handleClick} variant='link' value="week">1W</Button>
                <Button onClick={handleClick} variant='link' value="monthly">1M</Button>
                <Button onClick={handleClick} variant='link' value="tri-monthly">3M</Button>
                <Button onClick={handleClick} variant='link' value="anually">1Y</Button>
                <Button onClick={handleClick} variant='link' value="penta-annually">5Y</Button>
            </Row>
        </>
    )
}