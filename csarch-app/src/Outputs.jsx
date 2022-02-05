import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton  } from '@mui/material';

function createData(name, calories) {
    return { name, calories };
}

const rows = [
    createData('Binary', 1010001110001),
    createData('Hexadecimal', '0xFFFFFFF')
];

export default function Outputs() {
    return (
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
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">
                                {row.calories}
                                <IconButton>
                                    <ContentCopyIcon />
                                </IconButton >
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}