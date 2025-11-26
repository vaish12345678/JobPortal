import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Card, 
  Chip,
  IconButton 
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
];

const FilterCard = ({ onFiltersChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleChange = (filterType, value) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilter = (filterType) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[filterType];
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFiltersChange({});
  };

  return (
    <Card 
      sx={{ 
        p: 3, 
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="primary" />
          <Typography variant="h6" fontWeight="600">
            Filters
          </Typography>
        </Box>
        {Object.keys(selectedFilters).length > 0 && (
          <IconButton 
            size="small" 
            onClick={clearAllFilters}
            sx={{ color: 'text.secondary' }}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Active Filters Chips */}
      {Object.keys(selectedFilters).length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Active filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Object.entries(selectedFilters).map(([key, value]) => (
              <Chip
                key={key}
                label={`${key}: ${value}`}
                size="small"
                onDelete={() => clearFilter(key)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Filter Groups */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {filterData.map((filterGroup) => (
          <Box key={filterGroup.filterType}>
            <Typography 
              variant="subtitle1" 
              fontWeight="600" 
              sx={{ 
                mb: 2,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              {filterGroup.filterType}
            </Typography>
            
            <RadioGroup
              value={selectedFilters[filterGroup.filterType] || ''}
              onChange={(e) => handleChange(filterGroup.filterType, e.target.value)}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {filterGroup.array.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={
                      <Radio 
                        size="small" 
                        sx={{ 
                          color: 'primary.main',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {option}
                      </Typography>
                    }
                    sx={{
                      margin: 0,
                      padding: '4px 0',
                      '& .MuiFormControlLabel-label': {
                        fontSize: '0.875rem'
                      }
                    }}
                  />
                ))}
              </Box>
            </RadioGroup>
          </Box>
        ))}
      </Box>

      {/* Clear All Button */}
      {Object.keys(selectedFilters).length > 0 && (
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography 
            variant="body2" 
            onClick={clearAllFilters}
            sx={{ 
              color: 'error.main',
              cursor: 'pointer',
              textAlign: 'center',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Clear all filters
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default FilterCard;