import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function Outputs(props) {

    //let decimal = parseInt(props.primary)
    //let base = parseInt(props.base)

    function BinaryConversion(props) {
        var a = [];
        var n = props.base;
        var i;

        for (i = 0; n > 0; i++) {
            a[i] = n % 2;
            n = n / 2;
            n = ~~n
        }
        return a
    }

    return (
        <Box>
            <Box>
                <Typography variant='body1'>Your Input</Typography>
                <Typography variant='h4' sx={{ mb: 2, mt: 0 }}><b>{props.primary}</b>x10<sup><b>{props.base}</b></sup></Typography>
            </Box>

            <TableContainer component={Paper} sx={{ mt: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell align="right">Result</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Binary
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h5">
                                    <BinaryConversion base={props.base} />
                                    <IconButton>
                                        <ContentCopyIcon />
                                    </IconButton >
                                </Typography>
                            </TableCell>
                        </TableRow>

                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Hexadecimal
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="h5">
                                    <BinaryConversion base={props.base} />
                                    <IconButton>
                                        <ContentCopyIcon />
                                    </IconButton >
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}