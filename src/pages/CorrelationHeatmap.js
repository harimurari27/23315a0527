import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider, Tooltip } from '@mui/material';
import { fetchAllStockData } from '../utils/api';
import { computeCorrelationMatrix } from '../utils/stats';

const CorrelationHeatmap = () => {
  const [minutes, setMinutes] = useState(30);
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    fetchAllStockData(minutes).then(data => {
      const result = computeCorrelationMatrix(data);
      setMatrix(result);
    });
  }, [minutes]);

  const stocks = matrix.length ? Object.keys(matrix[0]) : [];

  return (
    <Box p={4}>
      <Typography variant="h4">Correlation Heatmap</Typography>
      <Slider
        value={minutes}
        onChange={(e, v) => setMinutes(v)}
        min={5}
        max={60}
        step={5}
        valueLabelDisplay="auto"
      />
      <Box mt={4} display="grid" gridTemplateColumns={`repeat(${stocks.length}, 1fr)`} gap={1}>
        {matrix.map((row, i) =>
          stocks.map((_, j) => (
            <Tooltip title={`ρ = ${row[stocks[j]].toFixed(2)}`} key={`${i}-${j}`}>
              <Box
                height={40}
                bgcolor={`rgba(0,0,255,${Math.abs(row[stocks[j]])})`}
              />
            </Tooltip>
          ))
        )}
      </Box>
    </Box>
  );
};

export default CorrelationHeatmap;
