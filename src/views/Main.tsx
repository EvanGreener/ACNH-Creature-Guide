import { SyntheticEvent, useState, useEffect } from 'react'
import {
    createTheme,
    Grid,
    SelectChangeEvent,
    Theme,
    ThemeProvider,
} from '@mui/material'
import { green } from '@mui/material/colors'
import CreatureList from '../components/CreatureList'
import Header from '../components/Header'
import Settings from '../components/Settings'
import Navbar from '../components/Navbar'
import leafDark from '../assets/leaf_dark.png'

const theme: Theme = createTheme({
    palette: {
        primary: {
            main: green['A200'],
        },
        secondary: {
            main: green[500],
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
    hours = hours < 10 ? '0' + hours : hours
    mins = mins < 10 ? '0' + mins : mins
    secs = secs < 10 ? '0' + secs : secs
    return (
        <div className="time">
            <code>{hours + ':' + mins + ':' + secs}</code>
        </div>
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

    const xsEverything = 12
    const smCL = 9
    const smSettings = 3

    return (
        <>
            <ThemeProvider theme={theme}>
                <Navbar logoSrc={leafDark} text="ACNH Creature Guide" />
                <section className="content">
                    {timeToString(time)}
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={xsEverything} sm={smSettings}>
                            <Header text="Settings" />
                            <Settings
                                region={region}
                                type={type}
                                sortBy={sortBy}
                                handleChangeRegion={handleChangeRegion}
                                handleChangeType={handleChangeType}
                                handleChangeSoryBy={handleChangeSoryBy}
                                handleChangeAllDay={handleChangeAllDay}
                            />
                        </Grid>
                        <Grid item xs={xsEverything} sm={smCL}>
                            <Header text="Obtainable creatures!!" />
                            <CreatureList
                                type={type}
                                region={region}
                                allDay={allDay}
                                sortBy={sortBy}
                            />
                        </Grid>
                    </Grid>
                </section>
            </ThemeProvider>
        </>
    )
}

export default Main
export { theme, Region, Type, SortBy }
