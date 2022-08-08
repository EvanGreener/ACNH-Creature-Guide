import { CSSProperties, forwardRef, HTMLProps } from 'react'
import config from '../config.json'
import { Box, Grid, Typography } from '@mui/material'

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

interface PropsRow {
    style: CSSProperties
    index: number
    data: Creature[]
}

interface PropsHeader {
    style: CSSProperties
}

const innerElementType = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
    ({ children, ...rest }, ref) => {
        return (
            <div ref={ref} {...rest}>
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 2,
                    }}
                />
                {children}
            </div>
        )
    }
)

const Header = ({ style }: PropsHeader) => {
    const { PRIMARY_BG } = config.THEME_COLORS
    const { HEADER } = config.FONTS
    const { NAME_H, PRICE, LOCATION, SHADOW_SIZE, TIME_AVAILABLE } =
        config.TABLE_COLUMN_HEADERS
    const { ROW_HEIGHT, LINE_HEIGHT } = config.DIMENS

    return (
        <div style={style}>
            <Box
                sx={{
                    backgroundColor: PRIMARY_BG,
                    lineHeight: LINE_HEIGHT,
                    mt: 1,
                    borderRadius: 1,
                    height: ROW_HEIGHT - 2,
                }}
            >
                <Grid container spacing={1}>
                    <Grid item xs={2} sm={2}>
                        <div
                            style={{
                                height: ROW_HEIGHT,
                                width: ROW_HEIGHT,
                            }}
                        />
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: HEADER,
                            }}
                        >
                            {NAME_H}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: HEADER,
                            }}
                        >
                            {PRICE}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: HEADER,
                            }}
                        >
                            {LOCATION}
                        </Typography>
                    </Grid>
                    <Box
                        item
                        component={Grid}
                        sm={2}
                        display={{ xs: 'none', sm: 'block' }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: HEADER,
                            }}
                        >
                            {SHADOW_SIZE}
                        </Typography>
                    </Box>
                    <Box
                        item
                        component={Grid}
                        sm={2}
                        display={{ xs: 'none', sm: 'block' }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: HEADER,
                            }}
                        >
                            {TIME_AVAILABLE}
                        </Typography>
                    </Box>
                </Grid>
            </Box>
        </div>
    )
}

const CreatureRow = ({ style, index, data }: PropsRow) => {
    const { SEA_LOCATION_TEXT, BUG_SHADOW_SIZE_TEXT, ALL_DAY_TEXT } = config
    const { NORMAL, NAME } = config.FONTS
    const { ROW_HEIGHT, LINE_HEIGHT } = config.DIMENS
    const creature = data[index]

    return (
        <div style={style}>
            <Box
                sx={{
                    lineHeight: LINE_HEIGHT,
                }}
            >
                <Grid container spacing={1}>
                    <Grid item xs={2} sm={2}>
                        <img
                            src={creature['icon_uri']}
                            alt="icon"
                            height={ROW_HEIGHT}
                            width={ROW_HEIGHT}
                        />
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: NAME,
                            }}
                        >
                            {creature.name['name-USen']}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: NORMAL,
                                wordBreak: 'break-word',
                            }}
                        >
                            {creature.price}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: NORMAL,
                                wordBreak: 'break-word',
                            }}
                        >
                            {!creature.availability.location
                                ? SEA_LOCATION_TEXT
                                : creature.availability.location}
                        </Typography>
                    </Grid>
                    <Box
                        item
                        component={Grid}
                        sm={2}
                        display={{ xs: 'none', sm: 'block' }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: NORMAL,
                            }}
                        >
                            {!creature.shadow
                                ? BUG_SHADOW_SIZE_TEXT
                                : creature.shadow}
                        </Typography>
                    </Box>
                    <Box
                        item
                        component={Grid}
                        sm={2}
                        display={{ xs: 'none', sm: 'block' }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontFamily: NORMAL,
                            }}
                        >
                            {creature.availability.time === ''
                                ? ALL_DAY_TEXT
                                : creature.availability.time}
                        </Typography>
                    </Box>
                </Grid>
            </Box>
        </div>
    )
}

export default CreatureRow
export { Creature, innerElementType }
