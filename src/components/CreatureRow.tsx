// import { Divider } from '@mui/material'
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
            <div className="row">
                <img
                    src={creature['icon_uri']}
                    alt="icon"
                    height={50}
                    width={50}
                    className="cell"
                />
                {/* <Divider orientation="vertical" flexItem /> */}
                <span
                    className="cell"
                    style={{ fontFamily: 'FinkHeavy', fontSize: '1.75vw' }}
                >
                    {creature.name['name-USen']}
                </span>
                {/* <Divider orientation="vertical" flexItem /> */}
                <span className="cell">{creature.price} bells</span>
                {/* <Divider orientation="vertical" flexItem /> */}
                <span className="cell">
                    {!creature.availability.location
                        ? 'Deep sea diving'
                        : creature.availability.location}
                </span>
                {/* <Divider orientation="vertical" flexItem /> */}
                <span className="cell">
                    {!creature.shadow ? 'N/A' : creature.shadow}
                </span>
                {/* <Divider orientation="vertical" flexItem /> */}
                <span className="cell">
                    {creature.availability.time === ''
                        ? 'All day'
                        : creature.availability.time}
                </span>
            </div>
            {/* <Divider /> */}
        </div>
    )
}

export default CreatureRow
export { Creature }
