import React, { useRef } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const categories = [
  'Software Engineer', 'Data Analyst', 'UI/UX Designer', 'Marketing',
  'Finance', 'HR', 'Product Manager', 'Cybersecurity', 'DevOps'
];

const CategoryCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6" fontWeight="bold">Browse</Typography>
          <ArrowForwardIos fontSize="small" />
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => scroll('left')}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <IconButton onClick={() => scroll('right')}>
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 4,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
        }}
      >
        {categories.map((category, index) => (
          <Typography
            key={index}
            sx={{
              whiteSpace: 'nowrap',
              color: 'gray',
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': { color: 'black' },
            }}
          >
            {category}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryCarousel;
