import React from 'react'
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

//prop info icons
import HotelIcon from '@material-ui/icons/Hotel';
import BathtubIcon from '@material-ui/icons/Bathtub';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

export default function Features({ propData }) {

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

                <Grid sm={3} xs={4} align="center" item>
                    {propData.dormitories && <Chip
                        variant="outlined"
                        icon={<HotelIcon />}
                        label={" Dormitorios " + propData.dormitories}
                    >
                    </Chip>}

                </Grid>

                <Grid sm={3} xs={4} align="center" item>
                    {propData.bathrooms && <Chip
                        variant="outlined"
                        icon={<BathtubIcon />}
                        label={" Baños " + propData.bathrooms}
                    />}
                </Grid>

                <Grid sm={3} xs={4} align="center" item>
                    <Chip
                        variant="outlined"
                        icon={<AspectRatioIcon />}
                        label={" Area " + propData.area + " m²"}
                    />
                </Grid>

                <Grid sm={3} xs={12} align="center" item>
                    {propData.parkings && <Chip
                        variant="outlined"
                        icon={<DriveEtaIcon />}
                        label={" Parqueaderos " + propData.parkings}
                    />}
                </Grid>

            </Grid>

        </div>
    )
}
