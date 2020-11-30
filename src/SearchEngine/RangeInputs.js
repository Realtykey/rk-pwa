import React from 'react'
import RangeInput from "./CustomRangeInput";
import { v4 as uuidv4 } from 'uuid';

const CustomRangeInputs = ({ rangeAtributes }) => {

    return (
        <form>
        {rangeAtributes.map(attribute => <RangeInput
                key={uuidv4()} 
                name={attribute.name}
                label={attribute.label}
                attribute={attribute.name}
                min={1}
                precision={0}
                />
            )}
        
        </form>
    )
}



export default CustomRangeInputs;