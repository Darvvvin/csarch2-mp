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

    //console.log(props.method)

    var errorMessage = ''
    var numberOfDecimals = 0
    let origInputString = props.primary
    let inputtedExp = ''
    let normalizedExp = ''

    if (props.primary) { // Process props.primary
        if (origInputString.includes('.')) {
            //var origLen = 0;
            var tempRestore = 0;
            if (origInputString.length > 3) {
                if(props.method === 'None') {
                    errorMessage = 'IS TOO LARGE!'
                }
            }
        } else {
            if (origInputString.length > 2) {
                if(props.method === 'None') {
                    errorMessage = 'IS TOO LARGE!'
                }
            }
        }

        if (origInputString.includes('.')) {
            origInputString = parseFloat(origInputString);
            origInputString = origInputString.toString();
        }

        for (let i = 0; i < origInputString.length; i++) {
            if (origInputString.charAt(i) === '.') {
                origInputString = origInputString.replace('.', '');
                numberOfDecimals = origInputString.length - i;
                i = origInputString.length
            }
        }

        if(origInputString.length > 2) {
            if(props.method === 'Truncate') {
                console.log("trunc")
                origInputString = origInputString.substring(0, 2)
            } else if(props.method === 'Inf') {
                console.log("inf")
                origInputString = origInputString.substring(0, 2)
                tempRestore = origInputString;
    
                if(negativeDecimal) {
                    origInputString = parseInt(origInputString) - 1
                } else {
                    origInputString = parseInt(origInputString) + 1
                }
    
                origInputString = origInputString.toString()
    
                if(origInputString.length > 2) {
                    origInputString = tempRestore
                }
    
            } else if(props.method === 'NegInf') {
                console.log("neginf")
                origInputString = origInputString.substring(0, 2)
                tempRestore = origInputString;
    
                if(negativeDecimal) {
                    origInputString = parseInt(origInputString) + 1
                } else {
                    origInputString = parseInt(origInputString) - 1
                }
    
                origInputString = origInputString.toString()
    
                if(origInputString.length > 2) {
                    origInputString = tempRestore
                }
    
            } else if(props.method === 'Even') {
                console.log("even")
                if(parseInt(origInputString.charAt(1)) % 2 !== 0 && parseInt(origInputString.charAt(2)) >= 5) { // +Inf
                    origInputString = origInputString.substring(0, 2)
                    tempRestore = origInputString;
    
                    if(negativeDecimal) {
                        origInputString = parseInt(origInputString) - 1
                    } else {
                        origInputString = parseInt(origInputString) + 1
                    }
                    origInputString = origInputString.toString()
    
                    if(origInputString.length > 2) {
                        origInputString = tempRestore
                    }
    
                } else { // Truncate
                    console.log("trunc")
                    origInputString = origInputString.substring(0, 2)
                }
            }
        }

        let zeroString = ''

        for (let i = 0; i < 2 - origInputString.length; i++) {
            zeroString += '0'
        }

        origInputString = zeroString + origInputString
    }

    if (props.base) {
        let temp = props.base
        if (negativeExponent) {
            temp *= -1
        }
        inputtedExp = temp
        
        if(parseInt(temp-numberOfDecimals)===0 && (props.method === 'Inf' || props.method === 'NegInf' || props.method === 'Even')) {
            normalizedExp = parseInt(temp - numberOfDecimals + 1).toString()
        } else {
        normalizedExp = parseInt(temp - numberOfDecimals).toString()
        }
    }

    //let decimal = parseInt(origInputString)
    let base = parseInt(props.base)

    const handleNegativeDecimal = (event) => {
        setNegDec(event.target.checked);
    }

    const handleNegativeExponent = (event) => {
        setNegExp(event.target.checked);
    }

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

    if (negativeDecimal) {
        sign = 1
    } else {
        sign = 0
    }

    // 1) Get e' in binary
    let eBar = props.base
    if (negativeExponent) {
        eBar = 398 - base
    } else {
        eBar = base + 398
    }

    eBar -= numberOfDecimals;
    eBar = decToBinary(eBar);

    while (eBar.length < 10) {
        eBar.unshift(0)
    }

    //console.log(eBar)

    // 2) Get MSD in binary
    var msd = origInputString.charAt(0);
    var msdBinary = decToBinary(msd);

    // 3) Get Combination Field
    var comboField = [0,0,0,0,0];

    if (props.primary === '') {
        comboField = [1,1,1,1,1];
    } else if(normalizedExp > 369 || normalizedExp < -398) {
        comboField = [1,1,1,1,0];
        //console.log(comboField)
    } else {
        if (parseInt(msd) <= 7) {
            comboField = []

            comboField.push(eBar[0]); // a
            comboField.push(eBar[1]); // b

            comboField.push(msdBinary[1]); // c
            comboField.push(msdBinary[2]); // d
            comboField.push(msdBinary[3]); // e

            // ComboField   | Type      | Exps MSB  | Coef MSD
            // 1 1 c d e    | Finite    | c d       | 1 0 0 e
        } else if (parseInt(msd) > 7) {
            comboField = []

            comboField.push(1);
            comboField.push(1);

            comboField.push(eBar[0]); // c
            comboField.push(eBar[1]); // d
            comboField.push(msdBinary[3]); // e
        }
    }

    // 4) Get Exponent Continuation (Remaining Digits [8])
    var expoCont = []
    var j = 0

    for (let i = 2; i < 10; i++) {
        expoCont[j] = eBar[i]
        j++
    }

    // 5) Get Densley Packed of per 3 digits in decimal
    function dpCoefCont() {
        var aN = 0;
        var bN = 0;
        var cN = 0;

        var finalArr = []

        for (let l = 1; l < 16; l++) {
            if (l % 3 === 0) {
                //Perform Densley Packed Algo
                aN = origInputString[l - 2]
                bN = origInputString[l - 1]
                cN = origInputString[l]

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
            }
        }
        return finalArr;
    }

    var binaryResult = []
    var finFifty = dpCoefCont()

    binaryResult.push(sign)
    binaryResult = binaryResult.concat(comboField, expoCont, finFifty)

    var binaryResultString = binaryResult.toString()

    binaryResultString = binaryResultString.replaceAll(',', '')

    var coefCount = dpCoefCont();

    // Process coef count for display
    coefCount.splice(10, 0, ' | ');
    coefCount.splice(21, 0, ' | ');
    coefCount.splice(32, 0, ' | ');
    coefCount.splice(43, 0, ' | ');

    var hexResult = BinaryToHex()

    function BinaryToHex() {
        let hexResult = ''
        for(let i = 0; i < 64; i += 4) {
            let hexDigit = binaryResultString.substring(i, i+4)
            let hexa = IndivBinaryToHex(hexDigit)
            hexResult += hexa
        }
        return hexResult
    }

    function IndivBinaryToHex(number) {
        let hexa = parseInt(number, 2).toString(16).toUpperCase();
        return hexa
    }

    function IsNegative(props) {
        if (props.negativeSign) {
            return '-'
        } else {
            return ''
        }
    }

    function copyBinary() {
        var text_to_copy = binaryResultString;

        if (!navigator.clipboard) {
            var copyText = document.getElementById("binary-result");
            var textArea = document.createElement("textarea");
            textArea.value = copyText.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            textArea.remove();
        } else {
            navigator.clipboard.writeText(text_to_copy).then(
                function () {
                })
                .catch(
                    function () {
                        alert("Error Copying. Please use a Chromium-based Browser to use the copy feature -Darvin"); // error
                    });
        }
    }

    function copyHex() {
        var text_to_copy = hexResult;

        if (!navigator.clipboard) {
            var copyText = document.getElementById("hex-result");
            var textArea = document.createElement("textarea");
            textArea.value = copyText.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            textArea.remove();
        } else {
            navigator.clipboard.writeText(text_to_copy).then(
                function () {
                })
                .catch(
                    function () {
                        alert("Error Copying. Please use a Chromium-based Browser to use the copy feature -Darvin"); // error
                    });
        }
    }

    return (
        <Box>
            <FormControlLabel control={<Checkbox otherProps onChange={handleNegativeDecimal} />} label="Negative Decimal" />
            <FormControlLabel control={<Checkbox otherProps onChange={handleNegativeExponent} />} label="Negative Exponent" />

            <Box>
                <Typography variant='body1'>Your Input</Typography>
                <Typography variant='h4' sx={{ mb: 2, mt: 0 }}><b><IsNegative negativeSign={negativeDecimal} />{props.primary === '' ? <span>NaN </span> : <span>{props.primary}</span>}</b>x10<sup><b>{props.base === '' ? <span>NaN </span> : <span>{inputtedExp}</span>}</b></sup></Typography>
            </Box>

            <Box>
                <Typography variant='body1'>Normalized Input <b style={{ color: 'red' }}>{errorMessage}</b></Typography>
                <Typography variant='h4' sx={{ mb: 2, mt: 0 }}><b><IsNegative negativeSign={negativeDecimal}/>{props.primary === '' ? <span>NaN </span> : <span>{origInputString}</span>}</b>x10<sup>{normalizedExp > 369 || normalizedExp < -398 ? <b style={{ color: '#04879c' }}>{normalizedExp}<span style={{fontSize: '10pt'}}>(Special case!)</span></b> : <b>{props.base === '' ? <span>NaN </span> : <span>{normalizedExp}</span>} </b>}</sup></Typography>
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
                                <Typography variant="h6">
                                    <small id='binary-result'>{sign} |  {comboField} | {expoCont} | {coefCount}</small>
                                    {/* {normalizedExp > 369 || normalizedExp < -398 || !isValid ? <span>n/a</span> : <span>{sign} | {comboField} | {expoCont} | {coefCount}</span>} */}
                                    <IconButton onClick={copyBinary}>
                                        <ContentCopyIcon />
                                    </IconButton >
                                </Typography>
                                <Typography variant='overline'><small>Sign (1) | Combination Field (5) | Exponent Continuation (8) | Coefficient Continuation (50)</small></Typography>
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
                                        <small id='hex-result'>{hexResult}</small>
                                    <IconButton onClick={copyHex}>
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
