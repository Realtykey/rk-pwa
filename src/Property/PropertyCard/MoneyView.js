import React,{useEffect} from 'react'

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

export default function MoneyView({propData}) {
    useEffect(
    ()=>{console.log('precio: ',propData.price)}
    ,[]
    );
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
                        label={propData.comission? "Precio $ "+propData.price:"Presupuesto $ " + propData.price}
                    />
                </Grid>
                {propData.comission &&<>
                <Grid item>
                    <Chip
                        style={chip}
                        label={" Te Comparto "+Number.parseFloat(propData.comission.percent) + "%"}
                    />
                </Grid>
                
                <Grid item>
                    <Chip
                        style={highlighted}
                        variant="outlined"
                        label={"Tu Ganas $ " + Number.parseFloat(propData.comission.value)}
                    />
                </Grid> </>
                }

            </Grid>


        </div>
    )
}
