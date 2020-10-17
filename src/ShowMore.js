import React,{useState} from 'react'
import Button from '@material-ui/core/Button';

export default function ShowMore({text}) {
    const [hidden,setHidden] = useState(false);

    const handleShowMore = ()=>{
        setHidden((hidden) => !hidden);
    }
    
    return (
        <div>
            {hidden ?
            <> 
            <div style={{ margin: '20px 0',textAlign:'left' }}>
                {text.slice(0, 75) + " ..."}
                <a onClick = {handleShowMore}>{hidden ? '  Ver más' : '  Ver menos'}</a>
            </div> 
            </>: 
            <>
            <div style={{ margin: '20px 0',textAlign:'left' }}>
                {text}
                <a onClick = {handleShowMore}>{hidden ? '  Ver más' : '  Ver menos'}</a>
            </div>
            </>
            }
        </div>
    )
}
