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
    const backgroundColor = index === 0 ? '#faa657' : ''
    const font = index === 0 ? 'FinkHeavy' : 'dialog'
    const fontSize = index === 0 ? '2vw' : '1.25vw'
    const fontSizeCellOne = index === 0 ? '2vw' : '1.5vw'

    return (
        <div style={style}>
            <div className="row" style={{ backgroundColor: backgroundColor }}>
                {index === 0 ? (
                    <div style={{ height: 60, width: 60 }}></div>
                ) : (
                    <img
                        src={creature['icon_uri']}
                        alt="icon"
                        height={60}
                        width={60}
                        className="cell"
                    />
                )}

                <span
                    className="cell"
                    style={{
                        fontFamily: 'FinkHeavy',
                        fontSize: fontSizeCellOne,
                    }}
                >
                    {creature.name['name-USen']}
                </span>
                <span
                    className="cell"
                    style={{ fontFamily: font, fontSize: fontSize }}
                >
                    {index === 0 ? 'PRICE' : creature.price + ' Bells'}
                </span>
                <span
                    className="cell"
                    style={{ fontFamily: font, fontSize: fontSize }}
                >
                    {!creature.availability.location
                        ? 'Deep sea diving'
                        : creature.availability.location}
                </span>
                <span
                    className="cell"
                    style={{ fontFamily: font, fontSize: fontSize }}
                >
                    {!creature.shadow ? 'N/A' : creature.shadow}
                </span>
                <span
                    className="cell"
                    style={{ fontFamily: font, fontSize: fontSize }}
                >
                    {creature.availability.time === ''
                        ? 'All day'
                        : creature.availability.time}
                </span>
            </div>
            <Divider />
        </div>
    )
}

export default CreatureRow
export { Creature }
