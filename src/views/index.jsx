import React, { Component } from 'react';
import {
    AppBar,
    createTheme,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Switch,
    ThemeProvider,
    Toolbar,
    Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';
import CreatureList from '../components/CreatureList';

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

    settings(region, allDay, sortBy, type) {
        return (
            <Paper
                elevation={12}
                sx={{
                    height: 400,
                    width: '100%',
                    backgroundColor: '#4caf50',
                    opacity: '90%',
                }}
            >
                <FormControl sx={{ m: 1 }}>
                    <InputLabel>Region</InputLabel>
                    <Select
                        label="Region"
                        onChange={this.handleChangeRegion}
                        value={region}
                    >
                        <MenuItem value={Region.NORTH}>North</MenuItem>
                        <MenuItem value={Region.SOUTH}>South</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        label="Type"
                        onChange={this.handleChangeType}
                        value={type}
                    >
                        <MenuItem value={Type.ALL}>All</MenuItem>
                        <MenuItem value={Type.SEA}>Sea</MenuItem>
                        <MenuItem value={Type.FISH}>Fish</MenuItem>
                        <MenuItem value={Type.BUGS}>Bugs</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                        label="Sort By:"
                        value={sortBy}
                        onChange={this.handleChangeSoryBy}
                    >
                        <MenuItem value={SortBy.PRICE}>Price</MenuItem>
                        <MenuItem value={SortBy.LOCATION}>Location</MenuItem>
                        <MenuItem value={SortBy.NAME}>Name</MenuItem>
                        <MenuItem value={SortBy.NONE}>None</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="All day"
                    onChange={this.handleChangeAllDay}
                    sx={{ m: 1 }}
                />
            </Paper>
        );
    }

    render() {
        const { time, type, region, allDay, sortBy } = this.state;
        let hours = time.getHours();
        let mins = time.getMinutes();
        let secs = time.getSeconds();
        hours = hours < 10 ? '0' + hours : hours;
        mins = mins < 10 ? '0' + mins : mins;
        secs = secs < 10 ? '0' + secs : secs;

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
                        <div className="time">
                            <code>{hours + ':' + mins + ':' + secs}</code>
                        </div>
                        <Grid container spacing={3}>
                            <Grid item xs={9}>
                                <Paper
                                    elevation={16}
                                    variant="outlined"
                                    sx={{
                                        opacity: '90%',
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            flexgrow: 1,
                                            textAlign: 'center',
                                        }}
                                    >
                                        Obtainable creatures {'(at present)'}!!
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper
                                    elevation={16}
                                    variant="outlined"
                                    sx={{ opacity: '90%' }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            flexgrow: 1,
                                            textAlign: 'center',
                                        }}
                                    >
                                        Settings
                                    </Typography>
                                </Paper>
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
                                {this.settings(region, allDay, sortBy, type)}
                            </Grid>
                        </Grid>
                    </section>
                </ThemeProvider>
            </>
        );
    }
}

export default Index;
