import React,{useState} from 'react'
import Button from '@material-ui/core/Button';

export default function ShowMore({text}) {
    const [hidden,setHidden] = useState(false);

    const handleShowMore = ()=>{
        setHidden((hidden) => !hidden);
    }
    
    return (
        <div>
            {hidden ? <p>{text.slice(0, 75) + " ..."}</p> : <p>{text}</p>}
            <Button onClick = {handleShowMore}>{hidden ? 'Ver más' : 'Ver menos'}</Button>
        </div>
    )
}
