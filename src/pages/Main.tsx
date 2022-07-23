import { SyntheticEvent, useState, useEffect } from 'react'
import {
    Box,
    Paper,
    createTheme,
    SelectChangeEvent,
    Theme,
    ThemeProvider,
    Typography,
} from '@mui/material'
// import { green } from '@mui/material/colors'
import CreatureList from '../components/CreatureList'
import Header from '../components/Header'
import Settings from '../components/Settings'
import Navbar from '../components/Navbar'
import leafDark from '../assets/leaf_dark.png'

/*
    oranges: ff8c4a, db6221, de791b, faa657
    blues: 708fff, 5667e8, 00072b
*/

const primaryBg = '#faa657'
const secondaryBg = '#3c7fde'
const primaryText = '#00072b'

const theme: Theme = createTheme({
    palette: {
        primary: {
            main: primaryBg,
        },
        background: {
            default: secondaryBg,
            paper: secondaryBg,
        },
        text: {
            primary: primaryText,
        },
    },
})

enum Region {
    NORTH = 'North',
    SOUTH = 'South',
}

enum Type {
    FISH = 'Fish',
    SEA = 'Sea',
    BUGS = 'Bugs',
    ALL = 'All',
}

enum SortBy {
    PRICE = 'Price',
    NAME = 'Name',
    LOCATION = 'Location',
    NONE = 'None',
}

function timeToString(time: Date) {
    let hours: string | number = time.getHours()
    let mins: string | number = time.getMinutes()
    let secs: string | number = time.getSeconds()
    const amPm = hours < 12 ? 'am' : 'pm'
    hours %= 12

    hours = hours === 0 ? 12 : hours
    mins = mins < 10 ? '0' + mins : mins
    secs = secs < 10 ? '0' + secs : secs
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Paper
                elevation={12}
                className="time"
                sx={{ backgroundColor: primaryText }}
            >
                <Typography
                    sx={{
                        color: primaryBg,
                        fontSize: '3.5vw',
                        fontFamily: 'FinkHeavy',
                        ml: 1,
                        mr: 1,
                        mb: -1,
                    }}
                >
                    {hours + ':' + mins + ':' + secs + amPm}
                </Typography>
            </Paper>
        </Box>
    )
}

const Main = () => {
    const [time, setTime] = useState<Date>(new Date())
    const [allDay, setAllDay] = useState<boolean>(true)
    const [region, setRegion] = useState<Region>(Region.NORTH)
    const [type, setType] = useState<Type>(Type.ALL)
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.PRICE)

    useEffect(() => {
        /**
         * Update the time display every second
         */
        setInterval(() => setTime(new Date()), 1000)
    }, [])

    const handleChangeRegion = (event: SelectChangeEvent<Region>) => {
        setRegion(event.target.value as Region)
    }

    const handleChangeType = (event: SelectChangeEvent<Type>) => {
        setType(event.target.value as Type)
    }

    const handleChangeSoryBy = (event: SelectChangeEvent<SortBy>) => {
        setSortBy(event.target.value as SortBy)
    }

    const handleChangeAllDay = (
        _event: SyntheticEvent<Element, Event>,
        checked: boolean
    ) => {
        setAllDay(checked)
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Navbar logoSrc={leafDark} text="ACNH Creature Guide" />
                <section className="content">
                    <Box sx={{ m: 1 }}>
                        <Header />
                        {timeToString(time)}
                        <Settings
                            region={region}
                            sortBy={sortBy}
                            type={type}
                            handleChangeAllDay={handleChangeAllDay}
                            handleChangeRegion={handleChangeRegion}
                            handleChangeSoryBy={handleChangeSoryBy}
                            handleChangeType={handleChangeType}
                        />
                        <CreatureList
                            type={type}
                            region={region}
                            allDay={allDay}
                            sortBy={sortBy}
                        />
                    </Box>
                    <Box
                        sx={{
                            textAlign: 'right',

                            mr: 5,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontFamily: 'FinkHeavy' }}
                        >
                            E & J
                        </Typography>
                    </Box>
                </section>
            </ThemeProvider>
        </>
    )
}

export default Main
export { theme, Region, Type, SortBy }
