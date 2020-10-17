import React from 'react'

import Typography from '@material-ui/core/Typography';
import ShowMore from '../../ShowMore';

import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

const Detail = ({ detail, icon, stretch }) => {
  const rootStyle = stretch ? { display: 'flex', flexDirection: 'row', paddingTop: '3px', alignItems: 'flex-start' } :
    {
      width: '87px',
      display: 'flex'
    };

  const descriptionStyle = { fontSize: '14px', padding: '2px 6px' };
  const iconStyle = { color: 'gray' };

  const styledIcon = React.cloneElement(
    icon,
    { style: iconStyle }
  );

  return (
    <div style={rootStyle}>
      {styledIcon}
      <Typography style={descriptionStyle} paragraph>
        {detail}
      </Typography>
    </div>
  );
}


const root = {
  padding: '0 20px',
  width: '85%',
  margin: '20px 0px',
  overflowWrap: 'anywhere',
}
function PropertyDetails(props) {

  const data = props.propData ? props.propData : null;

  return (
    <div style={root}>
      <Typography style={{color:'white', minHeight: 64 ,margin:'20px 0px'}} variant="h5">
        {data.title}
      </Typography>

      <Detail stretch={true} detail={data.map.address} icon={<LocationOnIcon />} />

      <div style={{
        display: 'flex',
        width: '100%'
      }}>

        <Detail stretch={false} detail={data.propType} icon={<HomeIcon />} />
        <Detail stretch={false} detail={data.operation} icon={<BusinessCenterIcon />} />
      </div>

      <ShowMore text={data.description}/>
    </div>

  )
}

export default PropertyDetails