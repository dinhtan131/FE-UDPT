import React, { useState } from 'react';
import { createVoucher } from '../../data/mockData'; // Adjust the import path based on your project structure
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CreateVoucher = () => {
  const [formData, setFormData] = useState({
    require_point: '',
    title: '',
    description: '',
    provider: 'Grab', // Default to "Grab"
    url: '',
  });
  const [error, setError] = useState(null);
  const theme = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createVoucher(formData);
      if (response) {
        alert('Voucher created successfully!');
        setFormData({
          require_point: '',
          title: '',
          description: '',
          provider: 'Grab', // Reset to default after submission
          url: '',
        });
      } else {
        alert('Failed to create voucher.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      maxWidth="400px"
      mx="auto"
      mt={5}
      p={3}
      bgcolor="#ffffff" // Light background color
      borderRadius="8px"
      boxShadow={3}
      border={`1px solid ${theme.palette.primary.main}`} // Add border color
    >
      <Typography variant="h4" mb={3} color={theme.palette.primary.dark}>
        Create Voucher
      </Typography>

      <TextField
        label="Required Points"
        name="require_point"
        type="number"
        value={formData.require_point}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
        InputLabelProps={{
          style: { color: theme.palette.primary.main }, // Change label color
        }}
        InputProps={{
          style: { color: '#000' }, // Change text color to black
        }}
        sx={{
          backgroundColor: '#E6E6FA	', // Light grey input background
          borderRadius: '5px',
        }}
      />

      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
        InputLabelProps={{
          style: { color: theme.palette.primary.main },
        }}
        InputProps={{
          style: { color: '#000' }, // Change text color to black
        }}
        sx={{
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
        }}
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
        InputLabelProps={{
          style: { color: theme.palette.primary.main },
        }}
        InputProps={{
          style: { color: '#000' }, // Change text color to black
        }}
        sx={{
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
        }}
      />

      {/* Wrapped Select in FormControl for better styling */}
      <FormControl fullWidth required sx={{ mt: 2 }}>
        <InputLabel
          id="provider-label"
          sx={{ color: '#000' }} // Label color
        >
          Provider
        </InputLabel>
        <Select
          labelId="provider-label"
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          sx={{
            backgroundColor: '#f0f0f0',
            borderRadius: '5px',
            color: '#000', // Text color inside the Select
          }}
        >
          <MenuItem value="Grab">Grab</MenuItem>
          <MenuItem value="Haidilao">Haidilao</MenuItem>
          <MenuItem value="Highland">Highland</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="URL"
        name="url"
        value={formData.url}
        onChange={handleChange}
        margin="normal"
        fullWidth
        required
        InputLabelProps={{
          style: { color: theme.palette.primary.main },
        }}
        InputProps={{
          style: { color: '#000' }, // Change text color to black
        }}
        sx={{
          backgroundColor: '#f0f0f0',
          borderRadius: '5px',
        }}
      />

      {error && (
        <Typography variant="body2" color="error" mt={2}>
          Error: {error}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: theme.palette.primary.main,
          color: '#ffffff',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Create Voucher
      </Button>
    </Box>
  );
};

export default CreateVoucher;
