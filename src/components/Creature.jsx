import { Divider } from '@mui/material';

const Creature = (props) => {
    const { style, index, data } = props;
    const creature = data[index];

    return (
        <div style={style}>
            <div
                style={{
                    display: 'flex',
                    flexFlow: 'row wrap',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                }}
            >
                <img
                    src={creature['icon_uri']}
                    alt="icon"
                    height={60}
                    width={60}
                />
                <span style={{ width: '16%' }}>
                    {creature.name['name-USen']}
                </span>
                {'|'}
                <span style={{ width: '16%' }}>${creature.price}</span>
                {'|'}
                <span style={{ width: '17%' }}>
                    {!creature.availability.location
                        ? 'Deep sea diving'
                        : creature.availability.location}
                </span>
                {'|'}
                <span style={{ width: '16%' }}>
                    {!creature.shadow ? 'N/A' : creature.shadow}
                </span>
                {'|'}
                <span style={{ width: '16%' }}>
                    {creature.availability.time === ''
                        ? 'All day'
                        : creature.availability.time}
                </span>
                <Divider />
            </div>
        </div>
    );
};

export default Creature;
