import React from 'react'

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

let formatters = {
    default: new Intl.NumberFormat(),
    currency: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    whole: new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
    oneDecimal: new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 1, maximumFractionDigits: 1 }),
    twoDecimal: new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 })
};

export default function PropertyMoney(props) {
    const data = props.propData;

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
    

    return (
        <div style={{ width: '100%' }}>
            <Grid
                style={{ width: '100%' }}
                spacing={1}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"

            >


                <Grid item>
                    <Chip
                        style={chip}
                        label={"Precio $ " + data.price}
                    />
                </Grid>
                {data.comission && 
                <Grid item>
                    <Chip
                        style={chip}
                        label={" Te comparto "+Number.parseFloat(data.comission.percent)+"%"}
                    />
                </Grid>
                }

                {data.comission && 
                    <Grid item>
                        <Chip
                            style={highlighted}
                            variant="outlined"
                            label={"Tu Ganas $ " +  Number.parseFloat(data.comission.value)}
                        />
                    </Grid>
                }

            </Grid>


        </div>
    )
}
