import React, { useState, useEffect } from 'react';
import './RangePrice.css';

const RangePrice = ({min , max , gap}) => {
    const [showMinTooltip, setShowMinTooltip] = useState(false);
    const [showMaxTooltip, setShowMaxTooltip] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(max);
    const priceGap = gap;

    useEffect(() => {
        if (maxPrice - minPrice < priceGap) {
            setMaxPrice(minPrice + priceGap);
        }
    }, [minPrice, maxPrice]);

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (maxPrice - value >= priceGap) {
      setMinPrice(value);
    }
  }

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value - minPrice >= priceGap) {
      setMaxPrice(value);
    }
  };

  const handleMinRangeChange = (e) => {
    const value = parseInt(e.target.value);
    if (maxPrice - value >= priceGap) {
      setMinPrice(value);
    } else {
      setMinPrice(maxPrice - priceGap);
    }
  };

  const handleMaxRangeChange = (e) => {
    const value = parseInt(e.target.value);
    if (value - minPrice >= priceGap) {
      setMaxPrice(value);
    } else {
      setMaxPrice(minPrice + priceGap);
    }
  };

  return (
    <div className="rangeprice-continer">
        <header>
            <div>
                <input type='text' value={minPrice}/>
                <h4>Min</h4>
            </div>
            <div>
                <input type='text' value={maxPrice}/>
                <h4>Max</h4>
            </div>
        </header>
        <div className="tooltip">
            {showMinTooltip && (<span className='min-tooltip' style={{left: `calc(${(minPrice / max) * 100}% - 25px)` }}>{minPrice}</span>)}
            {showMaxTooltip && ( <span className='max-tooltip' style={{right: `calc(${100 - (maxPrice / max) * 100}% - 25px)`}}>{maxPrice}</span>)}
        </div>
        <div className="slider">
            <div className="progress" style={{left: `${(minPrice / max) * 100}%`, right: `${100 - (maxPrice / max) * 100}%`}}>
            </div>
        </div>
        <div className="range-input">
            <input type="range"  min={min} max={max} value={minPrice} className="min-range" onChange={handleMinRangeChange} onMouseDown={() => setShowMinTooltip(true)}
          onMouseUp={() => setShowMinTooltip(false)}
          onTouchStart={() => setShowMinTooltip(true)}
          onTouchEnd={() => setShowMinTooltip(false)} />
            <input type="range" min={min}  max={max}  value={maxPrice} className="max-range" onChange={handleMaxRangeChange} onMouseDown={() => setShowMaxTooltip(true)}
          onMouseUp={() => setShowMaxTooltip(false)}
          onTouchStart={() => setShowMaxTooltip(true)}
          onTouchEnd={() => setShowMaxTooltip(false)}/>
        </div>

    </div>
  );
};

export default RangePrice;