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

    let decimal = parseInt(props.primary)
    let base = parseInt(props.base)

    function decToBinary(n) {
        // array to store binary number
        let binaryNum = new Array(32);
        //let reverseArray = [0]; // Have sign bit ready (set to + for now)
        let reverseArray = [];

        // counter for binary array
        let i = 0;
        while (n > 0) {

            // storing remainder in binary array
            binaryNum[i] = n % 2;
            n = Math.floor(n / 2);
            i++;
        }

        // printing binary array in reverse order
        for (let j = i - 1; j >= 0; j--)
            reverseArray.push(binaryNum[j]);

        return reverseArray;
    }

    // 0) Get sign
    var sign = 0;

    // 1) Get e' in binary
    var eBar = base + 398
    eBar = decToBinary(eBar);

    // 2) Get MSD in binary
    var msd = decimal.toString()[0];
    var msdBinary = decToBinary(msd);

    // 3) Get Combination Field
    var comboField = [];

    // ComboField   | Type      | Exps MSB  | Coef MSD
    // a b c d e    | Finite    | a b       | 0 c d e
    if(0 <= parseInt(msd) && parseInt(msd) <= 7) {
        comboField.push(eBar[0]); // a
        comboField.push(eBar[1]); // b

        comboField.push(msdBinary[1]); // c
        comboField.push(msdBinary[2]); // d
        comboField.push(msdBinary[3]); // e

    // ComboField   | Type      | Exps MSB  | Coef MSD
    // 1 1 c d e    | Finite    | c d       | 1 0 0 e
    } else if (8 <= parseInt(msd) && parseInt(msd) <= 9) {
        comboField.push(1);
        comboField.push(1);
        
        comboField.push(eBar[0]); // c
        comboField.push(eBar[1]); // d
        comboField.push(msdBinary[3]); // e
    }

    // 4) Get Exponent Continuation (Remaining Digits [8])
    var expoCont = []
    var j = 0

    for(let i = 2; i < 10; i++) {
        expoCont[j] = eBar[i]
        j++
    }

    // 5) Get Densley Packed of per 3 digits in decimal
    function dpCoefCont (decimal) {
        var aN = 0;
        var bN = 0;
        var cN = 0;

        console.log("STARTINGSTARTINGSTARTINGSTARTINGSTARTING");

        for(let i = 1; i < 16; i++) {
            if(i % 3 === 0) {
                //Perform Densley Packed Algo
                aN = decimal.toString()[i-3]
                bN = decimal.toString()[i-2]
                cN = decimal.toString()[i-1]

                aN = decToBinary(aN)
                bN = decToBinary(bN)
                cN = decToBinary(cN)

                while(aN.length < 4)
                    aN.unshift(0)
                
                while(bN.length < 4)
                    bN.unshift(0)
                
                while(cN.length < 4)
                    cN.unshift(0)

                //Densley Packed Conversion
                
                
                console.log("-----------------");
                console.log('a: ' + aN)
                console.log('b: ' + bN)
                console.log('c: ' + cN)
            }
        }
    }

    dpCoefCont(decimal);
    

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
                                    {sign} | {comboField} | {expoCont} | 
                                    <IconButton>
                                        <ContentCopyIcon />
                                    </IconButton >
                                </Typography>
                                <Typography variant='overline'><small>Sign | Combination Field | Exponent Continuation | Coefficient Continuation</small></Typography>
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
                                    {eBar}
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