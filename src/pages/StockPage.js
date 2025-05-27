import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, Slider } from '@mui/material';
import { fetchStockData } from '../utils/api';
import { calculateAverage } from '../utils/stats';

const StockPage = () => {
  const [stock, setStock] = useState('AAPL');
  const [minutes, setMinutes] = useState(30);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStockData(stock, minutes).then(setData);
  }, [stock, minutes]);

  const avg = calculateAverage(data.map(d => d.price));

  return (
    <Box p={4}>
      <Typography variant="h4">Stock Page</Typography>
      <Box mt={2}>
        <Select value={stock} onChange={(e) => setStock(e.target.value)}>
          <MenuItem value="AAPL">AAPL</MenuItem>
          <MenuItem value="GOOG">GOOG</MenuItem>
          <MenuItem value="MSFT">MSFT</MenuItem>
        </Select>
        <Slider
          value={minutes}
          onChange={(e, v) => setMinutes(v)}
          min={5}
          max={60}
          step={5}
          valueLabelDisplay="auto"
        />
      </Box>
      <Box mt={4}>
        <Typography>Average Price: {avg.toFixed(2)}</Typography>
        <svg width="100%" height="300">
          {data.map((point, idx) => (
            <circle
              key={idx}
              cx={idx * 10}
              cy={300 - point.price}
              r={2}
              fill="blue"
            />
          ))}
        </svg>
      </Box>
    </Box>
  );
};

export default StockPage;
