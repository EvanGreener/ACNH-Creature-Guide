import React, { Component } from 'react';
import {
    AppBar,
    createTheme,
    Grid,
    ThemeProvider,
    Toolbar,
    Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import CreatureList from '../components/CreatureList';
import Header from '../components/Header';
import Settings from '../components/Settings';

export const theme = createTheme({
    palette: {
        primary: {
            main: green['A200'],
        },
        secondary: {
            main: green[500],
        },
    },
});

export const Region = {
    NORTH: 'North',
    SOUTH: 'South',
};

export const Type = {
    FISH: 'Fish',
    SEA: 'Sea',
    BUGS: 'Bugs',
    ALL: 'All',
};

export const SortBy = {
    PRICE: 'price',
    NAME: 'name',
    LOCATION: 'location',
    NONE: 'none',
};

function timeToString(time) {
    let hours = time.getHours();
    let mins = time.getMinutes();
    let secs = time.getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    mins = mins < 10 ? '0' + mins : mins;
    secs = secs < 10 ? '0' + secs : secs;
    return (
        <div className="time">
            <code>{hours + ':' + mins + ':' + secs}</code>
        </div>
    );
}

class Index extends Component {
    state = {
        time: new Date(),
        allDay: true,
        region: Region.NORTH,
        type: Type.ALL,
        sortBy: SortBy.PRICE,
    };

    componentDidMount() {
        /**
         * Update the time display every second
         */
        setInterval(() => this.setState({ time: new Date() }), 1000);
    }

    handleChangeRegion = (event) => {
        this.setState({ region: event.target.value });
    };

    handleChangeType = (event) => {
        console.log(event.target.value);
        this.setState({ type: event.target.value });
    };

    handleChangeAllDay = (event) => {
        this.setState({ allDay: event.target.checked });
    };

    handleChangeSoryBy = (event) => {
        this.setState({ sortBy: event.target.value });
    };

    render() {
        const { time, type, region, allDay, sortBy } = this.state;

        return (
            <>
                <ThemeProvider theme={theme}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ flexgrow: 1 }}
                            >
                                ACNH Creature guide
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <section className="content">
                        {timeToString(time)}
                        <Grid container spacing={3}>
                            <Grid item xs={9}>
                                <Header text="Obtainable creatures (at present)!!" />
                            </Grid>
                            <Grid item xs={3}>
                                <Header text="Settings" />
                            </Grid>
                            <Grid item xs={9}>
                                <CreatureList
                                    type={type}
                                    region={region}
                                    allDay={allDay}
                                    sortBy={sortBy}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Settings
                                    region={region}
                                    type={type}
                                    sortBy={sortBy}
                                    handleChangeRegion={this.handleChangeRegion}
                                    handleChangeType={this.handleChangeType}
                                    handleChangeSoryBy={this.handleChangeSoryBy}
                                    handleChangeAllDay={this.handleChangeAllDay}
                                />
                            </Grid>
                        </Grid>
                    </section>
                </ThemeProvider>
            </>
        );
    }
}

export default Index;
