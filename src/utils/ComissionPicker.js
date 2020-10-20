import React, { useEffect } from 'react';
import { ButtonBase } from '@material-ui/core';
import './styles.css';
import Grid from '@material-ui/core/Grid';

function getPercentages() {

    return Array(20).fill(null).map(
        (item, index) => {
            const value = Number.parseFloat(index * 0.05).toFixed(2);
            const label = Number.parseFloat(value * 100).toFixed(0);
            return ({
                label: `${label}%`,
                value: value
            });
        }
    )
}

const Option = ({ item, pickPercent, hidePicker }) => {
    const { label, value } = item;
    const root = {
        width: 52,
        height: 52,
        padding: 10,
        border: '1px solid rgba(255, 255, 255, 0.12)'
    }
    return (
        <ButtonBase style={root} onClick={() => { pickPercent('percent', value); hidePicker(true); }}>{label}</ButtonBase>
    );
}

export default function ComissionPicker({ pickPercent, hidePicker }) {

    const percentages = getPercentages();

    return (
        <Grid container justify="center">
            {
                percentages.map(item => {
                    return (
                        <Grid item key={item.label} >
                            <Option pickPercent={pickPercent} hidePicker={hidePicker} item={item} />
                        </Grid>
                    );
                })
            }
        </Grid>
    );
}
