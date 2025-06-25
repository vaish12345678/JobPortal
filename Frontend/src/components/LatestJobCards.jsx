

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function LatestJobCards({job}) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{ position: 'relative', paddingBottom: '3.5rem' }}>
        <CardContent>
          {/* Company Name */}
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {job.company.name}
          </Typography>

          {/* Location */}
          <Typography variant="body2" color="text.secondary">
            Location:{job.location}
          </Typography>

          {/* Job Title */}
          <Typography variant="h6" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
            {job.title}
          </Typography>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
           {job.description}
          </Typography>
        </CardContent>


        {/* Badge Container */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            right: 16,
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          {/* Position */}
          <Box
            sx={{
              backgroundColor: '#f3e5f5',
              color: '#6a1b9a',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              px: 1.5,
              py: 0.5,
              borderRadius: '999px',
            }}
          >
            {job.position} Positions
          </Box>

          {/* Package */}
          <Box
            sx={{
              backgroundColor: '#e8f5e9',
              color: '#2e7d32',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              px: 1.5,
              py: 0.5,
              borderRadius: '999px',
            }}
          >
            ₹{job.salary} LPA
          </Box>

          {/* Job Type */}
          <Box
            sx={{
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              px: 1.5,
              py: 0.5,
              borderRadius: '999px',
            }}
          >
            {job.jobType}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

