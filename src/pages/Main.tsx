import { SyntheticEvent, useState } from 'react'
import {
    Box,
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
import Time from '../components/Time'
import config from '../config.json'

const { PRIMARY_BG, PRIMARY_TEXT, SECONDARY_BG } = config.THEME_COLORS
const { TITLE } = config

const theme: Theme = createTheme({
    palette: {
        primary: {
            main: PRIMARY_BG,
        },
        background: {
            default: SECONDARY_BG,
            paper: SECONDARY_BG,
        },
        text: {
            primary: PRIMARY_TEXT,
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

const Main = () => {
    const [allDay, setAllDay] = useState<boolean>(true)
    const [region, setRegion] = useState<Region>(Region.NORTH)
    const [type, setType] = useState<Type>(Type.ALL)
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.PRICE)

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
                <Navbar logoSrc={leafDark} text={TITLE} />
                <section className="content">
                    <Box sx={{ m: 1 }}>
                        <Header />
                        <Time />
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
