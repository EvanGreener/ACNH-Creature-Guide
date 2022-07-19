import React, { Component } from 'react';
import { createTheme, Grid, ThemeProvider } from '@mui/material';
import { green } from '@mui/material/colors';
import CreatureList from '../components/CreatureList';
import Header from '../components/Header';
import Settings from '../components/Settings';
import Navbar from '../components/Navbar';
import leafDark from '../assets/leaf_dark.png';

const theme = createTheme({
    palette: {
        primary: {
            main: green['A200'],
        },
        secondary: {
            main: green[500],
        },
    },
});

const Region = {
    NORTH: 'North',
    SOUTH: 'South',
};

const Type = {
    FISH: 'Fish',
    SEA: 'Sea',
    BUGS: 'Bugs',
    ALL: 'All',
};

const SortBy = {
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
        const xsEverything = 12;
        const smCL = 9;
        const smSettings = 3;

        return (
            <>
                <ThemeProvider theme={theme}>
                    <Navbar logoSrc={leafDark} text="ACNH Creature Guide" />
                    <section className="content">
                        {timeToString(time)}
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            <Grid item xs={xsEverything} sm={smCL}>
                                <Header text="Obtainable creatures (at present)!!" />
                                <CreatureList
                                    type={type}
                                    region={region}
                                    allDay={allDay}
                                    sortBy={sortBy}
                                />
                            </Grid>
                            <Grid item xs={xsEverything} sm={smSettings}>
                                <Header text="Settings" />
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
export { theme, Region, Type, SortBy };
