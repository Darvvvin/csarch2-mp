import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Typography  } from '@mui/material';
import { Box } from '@mui/system';

function createData(type, result) {
    return { type, result };
}

export default function Outputs(props) {


    const rows = [
        createData('Binary', props.primary),
        createData('Hexadecimal', props.base)
    ];

    return (
        <Box>
        <Typography variant='h4'><center><b>{props.primary}</b>x10<sup><b>{props.base}</b></sup></center></Typography>
        <TableContainer component={Paper} sx={{ mt: 1 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell align="right">Result</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.type}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.type}
                            </TableCell>
                            <TableCell align="right">
                                {row.result}
                                <IconButton>
                                    <ContentCopyIcon />
                                </IconButton >
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    );
}