import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';

export default function PortfolioChart() {
    const { stocks, cash } = useSelector(state => state.portfolio.currentPortfolio);
    const [data, setData] = useState({});

    useEffect(() => {
        if (stocks) {
            const colors = [randomColorGenerator()];
            const stocksData = {
                names: ['Cash'],
                prices: [cash]
            };
            stocks.forEach(stock => {
                if (stock.shares > 0) {
                    colors.push(randomColorGenerator());
                    stocksData.names.push(stock.ticker);
                    stocksData.prices.push(stock.costBasis);
                }
            });
            setData({
                labels: [
                    ...stocksData.names
                ],
                datasets: [{
                    data: [
                        ...stocksData.prices
                    ],
                    backgroundColor: [...colors]
                }]
            })
        }
    }, [cash, stocks]);

    return (
        <>
        <Col>
        </Col>
        <Col md={8}>
            <Doughnut data={data} />
        </Col>
        </>
    )
};

const randomColorGenerator = () => {
    return '#' + (Math.random().toString(16) + '0000000').slice(2, 8)
}