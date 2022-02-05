import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Inputs() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box
            component="form"
            sx={{
                width: '60ch'
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant='h2'><b>The only <span className='specialColor'>Decimal-64</span> <br />Converter You'll Ever Need.</b></Typography>
            <Box sx={{ display: 'flex', mb: 1 }}>
                <FormControl sx={{minWidth: 150, mr: 1}}>
                    <InputLabel id="demo-simple-select-label">Method</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Method"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Round Off</MenuItem>
                        <MenuItem value={20}>NaN</MenuItem>
                    </Select>
                </FormControl>
                <TextField sx={{ flexGrow: 5, mr: 1 }} id="outlined-basic" type="number" label="Decimal" variant="outlined" />
                <TextField id="outlined-basic" type="number" label="Base-10" variant="outlined" />
            </Box>
            <Button variant="contained" sx={{ minWidth: '100%' }}><b>Convert</b></Button>
        </Box>
    );
}