import React from 'react'

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

const chip = {
    background: 'white',
    color: '#292131',
    fontWeight: 'bolder',
}

const highlighted = {
    background: 'white',
    color: 'red',
    fontWeight: 'bolder',
}

export default function MoneyView(props) {
    const data = props.propData;
    const root = {
        margin: '20px auto'
    }
    return (
        <div style={root}>
            <Grid
                spacing={1}
                container
                direction="row"
                alignItems="center"
            >
                <Grid item>
                    <Chip
                        style={chip}
                        label={"Precio $ " + data.price}
                    />
                </Grid>

                <Grid item>
                    <Chip
                        style={chip}
                        label={" Te Comparto "+Number.parseFloat(data.comission.percent).toFixed(2) + "%"}
                    />
                </Grid>

                <Grid item>
                    <Chip
                        style={highlighted}
                        variant="outlined"
                        label={"Tu Ganas $ " + Number.parseFloat(data.comission.value).toFixed(2)}
                    />
                </Grid>
            </Grid>


        </div>
    )
}
