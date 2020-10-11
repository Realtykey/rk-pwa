import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
//select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export function TypeInput() {
    const classes = useStyles();
    //select inputs state
    const [type, setType] = React.useState(' ');

    const handleType = (event) => {
        setType(event.target.value);
    };

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Tipo de inmueble</InputLabel>
            <Select
                labelId="propType"
                id="demo-simple-select-outlined"
                onChange={handleType}
                label="Tipo de inmueble"
                value={type}
            >
                <MenuItem value={'Departamento'}>Departamento</MenuItem>
                <MenuItem value={'Casa'}>Casa</MenuItem>
                <MenuItem value={'Casa Rentera'}>Casa Rentera</MenuItem>
                <MenuItem value={'Terreno'}>Terreno</MenuItem>
                <MenuItem value={'Bodega'}>Bodega</MenuItem>
                <MenuItem value={'Consultorio'}>Consultorio</MenuItem>
                <MenuItem value={'Departamento'}>Departamento</MenuItem>
                <MenuItem value={'Duplex'}>Duplex</MenuItem>
                <MenuItem value={'Edificio'}>Edificio</MenuItem>
                <MenuItem value={'Hacienda'}>Hacienda</MenuItem>
                <MenuItem value={'Hotel'}>Hotel</MenuItem>
                <MenuItem value={'Loft'}>Loft</MenuItem>
                <MenuItem value={'Oficina'}>Oficina</MenuItem>
                <MenuItem value={'Villa'}>Villa</MenuItem>
                <MenuItem value={'Suite'}>Suite</MenuItem>
                <MenuItem value={'Galpon'}>Galpón</MenuItem>
                <MenuItem value={'Local Comercial'}>Local Comercial</MenuItem>
                <MenuItem value={'Otros'}>Otros</MenuItem>

            </Select>
        </FormControl>

    )
}

export function OperationInput() {
    const classes = useStyles();

    const [operation, setOperation] = React.useState(' ');

    const handleOperation = (event) => {
        setOperation(event.target.value);
    };


    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Operación</InputLabel>
            <Select
                labelId="propType"
                id="demo-simple-select-outlined"
                onChange={handleOperation}
                label="Tipo de inmueble"
                value={operation}
            >
                <MenuItem value={'Venta'}>Venta</MenuItem>
                <MenuItem value={'Alquiler'}>Alquiler</MenuItem>
                <MenuItem value={'Anticresis'}>Anticresis</MenuItem>

            </Select>
        </FormControl>
    )
}
