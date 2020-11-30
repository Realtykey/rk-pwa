import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connectRange } from 'react-instantsearch-dom';
import Button from '@material-ui/core/Button';
import './CustomRangeInput.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const normal = {

}

const colored = {
  backgroundColor: "cyan",
  color: "black"
}


const RangeInput = ({ label, name, currentRefinement, refine }) => {
  const ref = React.createRef();
  return (
    <div className="input-wrapper">
      <TextField
        inputRef={ref}
        onKeyPress={event => {
          // console.log('evento: ',event);
          if (event.key === 'Enter') {
            console.log('enter pressed');
            refine({
              ...currentRefinement,
              min: event.target.value,
            });
            console.log(`applied min ${name}:`, event.target.value);
          }

          return event.target.value;
        }}
        label={label}
        name={name}
        variant="outlined"
        type="number"
        inputProps={{
          min: "0",
          step: 1
        }}
      />
      <Button variant="outlined" style={currentRefinement.min == "1" ? normal : colored} onClick={() => {
        console.log('ref value: ', ref.current.value);
        if (ref.current.value) {
          refine({
            ...currentRefinement,
            min: ref.current.value,
          });

        }
      }}>
        <FontAwesomeIcon icon={faCheck} />
      </Button>
    </div>
  );
}


export default connectRange(RangeInput);
