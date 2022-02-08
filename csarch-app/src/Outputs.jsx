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

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Outputs(props) {
    var [negativeDecimal, setNegDec] = React.useState(false);
    var [negativeExponent, setNegExp] = React.useState(false);

    let decimal = parseInt(props.primary)
    let base = parseInt(props.base)

    const handleNegativeDecimal = (event) => {
        setNegDec(event.target.checked);
    }

    const handleNegativeExponent = (event) => {
        setNegExp(event.target.checked);
    }

    console.log('Decimal is ' + negativeDecimal)
    console.log('Exponent is ' + negativeExponent)

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

        while (reverseArray.length < 4)
            reverseArray.unshift(0)

        return reverseArray;
    }

    // 0) Get sign
    var sign = 0;

    if(negativeDecimal) {
        sign = 1
    } else {
        sign = 0
    }

    // 1) Get e' in binary
    var eBar = base + 398
    eBar = decToBinary(eBar);

    //Sign
    eBar.unshift(0) // 0 For now

    // 2) Get MSD in binary
    var msd = decimal.toString()[0];
    var msdBinary = decToBinary(msd);

    // 3) Get Combination Field
    var comboField = [];

    // ComboField   | Type      | Exps MSB  | Coef MSD
    // a b c d e    | Finite    | a b       | 0 c d e
    if (parseInt(msd) <= 7) {
        //console.log("LESS THAN 7!")
        comboField.push(eBar[0]); // a
        comboField.push(eBar[1]); // b

        comboField.push(msdBinary[1]); // c
        comboField.push(msdBinary[2]); // d
        comboField.push(msdBinary[3]); // e

        // ComboField   | Type      | Exps MSB  | Coef MSD
        // 1 1 c d e    | Finite    | c d       | 1 0 0 e
    } else if (8 <= parseInt(msd)) {
        comboField.push(1);
        comboField.push(1);

        comboField.push(eBar[0]); // c
        comboField.push(eBar[1]); // d
        comboField.push(msdBinary[3]); // e
    }

    // 4) Get Exponent Continuation (Remaining Digits [8])
    var expoCont = []
    var j = 0

    for (let i = 2; i < 10; i++) {
        expoCont[j] = eBar[i]
        j++
    }

    // 5) Get Densley Packed of per 3 digits in decimal
    function dpCoefCont(decimal) {
        var aN = 0;
        var bN = 0;
        var cN = 0;

        var finalArr = []

        for (let l = 1; l < 16; l++) {
            if (l % 3 === 0) {
                //Perform Densley Packed Algo
                aN = decimal.toString()[l - 2]
                bN = decimal.toString()[l - 1]
                cN = decimal.toString()[l]

                aN = decToBinary(aN)
                bN = decToBinary(bN)
                cN = decToBinary(cN)

                while (aN.length < 4)
                    aN.unshift(0)

                while (bN.length < 4)
                    bN.unshift(0)

                while (cN.length < 4)
                    cN.unshift(0)

                //Densley Packed Conversion Here
                var a = aN[0]
                var b = aN[1]
                var c = aN[2]
                var d = aN[3]

                var e = bN[0]
                var f = bN[1]
                var g = bN[2]
                var h = bN[3]

                var i = cN[0]
                var j = cN[1]
                var k = cN[2]
                var m = cN[3]

                if (a === 0 && e === 0 && i === 0) {
                    finalArr.push(b)
                    finalArr.push(c)
                    finalArr.push(d)

                    finalArr.push(f)
                    finalArr.push(g)
                    finalArr.push(h)

                    finalArr.push(0)

                    finalArr.push(j)
                    finalArr.push(k)
                    finalArr.push(m)

                } else if (a === 0 && e === 0 && i === 1) {
                    finalArr.push(b)
                    finalArr.push(c)
                    finalArr.push(d)

                    finalArr.push(f)
                    finalArr.push(g)
                    finalArr.push(h)

                    finalArr.push(1)

                    finalArr.push(0)
                    finalArr.push(0)
                    finalArr.push(m)

                } else if (a === 0 && e === 1 && i === 0) {
                    finalArr.push(b)
                    finalArr.push(c)
                    finalArr.push(d)

                    finalArr.push(j)
                    finalArr.push(k)
                    finalArr.push(h)

                    finalArr.push(1)

                    finalArr.push(0)
                    finalArr.push(1)
                    finalArr.push(m)

                } else if (a === 0 && e === 1 && i === 1) {
                    finalArr.push(b)
                    finalArr.push(c)
                    finalArr.push(d)

                    finalArr.push(1)
                    finalArr.push(0)
                    finalArr.push(h)

                    finalArr.push(1)

                    finalArr.push(1)
                    finalArr.push(1)
                    finalArr.push(m)

                } else if (a === 1 && e === 0 && i === 0) {
                    finalArr.push(j)
                    finalArr.push(k)
                    finalArr.push(d)

                    finalArr.push(f)
                    finalArr.push(g)
                    finalArr.push(h)

                    finalArr.push(1)

                    finalArr.push(1)
                    finalArr.push(0)
                    finalArr.push(m)

                } else if (a === 1 && e === 0 && i === 1) {
                    finalArr.push(f)
                    finalArr.push(g)
                    finalArr.push(d)

                    finalArr.push(0)
                    finalArr.push(1)
                    finalArr.push(h)

                    finalArr.push(1)

                    finalArr.push(1)
                    finalArr.push(1)
                    finalArr.push(m)

                } else if (a === 1 && e === 1 && i === 0) {
                    finalArr.push(j)
                    finalArr.push(k)
                    finalArr.push(d)

                    finalArr.push(0)
                    finalArr.push(0)
                    finalArr.push(h)

                    finalArr.push(1)

                    finalArr.push(1)
                    finalArr.push(1)
                    finalArr.push(m)

                } else if (a === 1 && e === 1 && i === 1) {
                    finalArr.push(0)
                    finalArr.push(0)
                    finalArr.push(d)

                    finalArr.push(1)
                    finalArr.push(1)
                    finalArr.push(h)

                    finalArr.push(1)

                    finalArr.push(1)
                    finalArr.push(1)
                    finalArr.push(m)
                }

                // console.log("-----------------");
                // console.log('a: ' + aN)
                // console.log('b: ' + bN)
                // console.log('c: ' + cN)
            }
        }

        return finalArr;
    }

    var coefCount = dpCoefCont(decimal);

    function IsNegative(props) {
        if (props.negativeSign) {
            return '-'
        } else {
            return ''
        }
    }

    function IsNegativeExp(props) {
        if (props.negativeSign) {
            return '-'
        } else {
            return ''
        }
    }

    return (
        <Box>
            <FormControlLabel control={<Checkbox otherProps onChange={handleNegativeDecimal} />} label="Negative Decimal" />
            <FormControlLabel control={<Checkbox otherProps onChange={handleNegativeExponent} />} label="Negative Exponent" />

            <Box>
                <Typography variant='body1'>Your Input</Typography>
                <Typography variant='h4' sx={{ mb: 2, mt: 0 }}><b><IsNegative negativeSign={negativeDecimal} />{props.primary}</b>x10<sup><b><IsNegativeExp negativeSign={negativeExponent} />{props.base}</b></sup></Typography>
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
                                <Typography variant="h6"><small>
                                    {sign} | {comboField} | {expoCont} | {coefCount}</small>
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