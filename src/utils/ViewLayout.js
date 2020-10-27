import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

//redux imports
import { useSelector } from 'react-redux'

const Message = ({ content }) => {
    return (
        <h1 style={{ color: 'gray' }}>{content}</h1>
    );
}

export default function ({ name, list, detail, iterable, showDetails }) {

    const { loading } = useSelector(state => state.general)

    const container = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '200px'
    }
    const root = { paddingTop: 10};
    return (
        <div style={root}>
            {iterable.length > 0 ? <>
                <Hidden only={['xs','sm']}>
                    <Grid justify="center" container>
                        <Grid align="center" md={4} lg={4} item>
                            {list}
                        </Grid>
                        <Grid container md={8} lg={8} item>
                            <Grid container item align="center">{detail}</Grid>
                        </Grid>
                    </Grid>
                </Hidden>

                <Hidden only={['md', 'lg']}>
                    <Grid justify="center" container>
                        <Box display={showDetails ? 'inline' : 'none'}>
                            <Grid container item xs={12} sm={12} align="center">{detail}</Grid>
                        </Box>
                        <Box display={showDetails ? 'none' : 'inline'}>
                            <Grid container item xs={12} sm={12} align="center">{list}</Grid>
                        </Box>
                    </Grid>
                </Hidden>

            </> :
                <Container style={container}>
                    {loading ?
                        <CircularProgress size={100} color="secondary" /> :
                        <Message content={`No hay ${name} para mostrar`} />
                    }
                </Container>
            }
        </div>
    )
}
