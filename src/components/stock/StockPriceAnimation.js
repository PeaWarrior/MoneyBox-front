import React from 'react';
import { useSpring, animated } from 'react-spring';

export default function StockPriceAnimation({price, color}) {
    const props = useSpring({
        from: {transform: 'scale(1.1)', color: color},
        to: {transform: 'scale(1)', color: color},
        reset: true,
        config: {
            duration: 0,
            clamp: true
        }
      });

    return (
        <animated.h3 style={props}>${price}</animated.h3>
    )
}