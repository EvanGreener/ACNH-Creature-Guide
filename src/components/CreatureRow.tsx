import { Divider } from '@mui/material'
import { CSSProperties } from 'react'

interface Creature {
    'file-name': string
    icon_uri: string
    name: Langs
    price: number
    availability: Availability
    shadow: string | undefined
}

interface Availability {
    location: string | undefined
    time: string
    'month-array-northern': number[]
    'month-array-southern': number[]
    'time-array': number[]
    isAllDay: boolean
}

interface Langs {
    'name-USen': string
}

interface Props {
    style: CSSProperties
    index: number
    data: Creature[]
}

const CreatureRow = ({ style, index, data }: Props) => {
    const creature = data[index]

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
                    height={50}
                    width={50}
                />
                <span style={{ width: '16%' }}>
                    {creature.name['name-USen']}
                </span>
                {'|'}
                <span style={{ width: '16%' }}>{creature.price} bells</span>
                {'|'}
                <span style={{ width: '16%' }}>
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
    )
}

export default CreatureRow
export { Creature }
