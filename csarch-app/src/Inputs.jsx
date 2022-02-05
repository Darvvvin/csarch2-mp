import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';

export default function Inputs() {
    return (
        <Box
            component="form"
            sx={{
                width: '60ch'
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant='h2'><b>The only <span className='specialColor'>Decimal-64</span> <br/>Converter You'll Ever Need.</b></Typography>
            <Box sx={{ display: 'flex', mb: 1}}>
                <TextField sx={{ flexGrow: 1, mr: 1 }} id="outlined-basic" type="number" label="Decimal" variant="outlined" />
                <TextField sx={{ml: 1}} id="outlined-basic" type="number" label="Base-10" variant="outlined" />
            </Box>
            <Button variant="contained" sx={{minWidth: '100%'}}><b>Convert</b></Button>
        </Box>
    );
}