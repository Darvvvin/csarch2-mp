import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
// import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Outputs from './Outputs';

export default function Inputs() {
    var [method, setMethod] = React.useState('');
    var [primary, setPrimary] = React.useState('');
    var [base, setBase] = React.useState('');

    const handleChange = (event) => {
        setMethod(event.target.value);
        console.log('Value Changed!');
    };

    const handlePrimary = (event) => {
        setPrimary(event.target.value);
        console.log('Primary Changed to ' + primary);
    };

    const handleBase = (event) => {
        setBase(event.target.value);
        console.log('Base Changed to ' + base);
    };


    // function handleConvert() {
    //     console.log('Clicked!')
    // }

    return (
        <Box
            component="form"
            sx={{
                width: '60ch'
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant='h2'><b>The Only <span className='specialColor'>Decimal-64</span> <br />Converter You'll Ever Need.</b></Typography>
            <Box sx={{ display: 'flex', mb: 1 }}>
                <FormControl required sx={{ minWidth: 150, mr: 1 }}>
                    <InputLabel id="demo-simple-select-label">Method</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={method}
                        label="Method"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Round Off</MenuItem>
                        <MenuItem value={20}>NaN</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16)
                    }}
                    sx={{ flexGrow: 5, mr: 1 }}
                    id="outlined-basic"
                    type="number"
                    label="Decimal"
                    variant="outlined"
                    value={primary}
                    onChange={handlePrimary}
                />
                <TextField required
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                    }} id="outlined-basic" type="number" label="Base-10" variant="outlined" 
                    value={base}
                    onChange={handleBase}
                />
            </Box>
            {/* <Button variant="contained" onClick={handleConvert} sx={{ minWidth: '100%', fontSize: '0.75em' }}><b>Convert</b></Button> */}
            <Outputs primary={primary} base={base}/>
        </Box>
    );
}