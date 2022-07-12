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

const theme = createTheme({
    palette: {
        primary: {
            main: green['A200'],
        },
    },
});

const Region = {
    NORTH: 'North',
    SOUTH: 'South',
};

class Index extends Component {
    state = {
        time: new Date(),
        allDay: true,
        loading: true,
        region: Region.NORTH,
    };

    componentDidMount() {
        /**
         * Update the time display every second
         */
        setInterval(() => this.setState({ time: new Date() }), 1000);
    }

    render() {
        const { time } = this.state;
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
                            <Grid item xs={8}>
                                <Typography
                                    variant="h5"
                                    sx={{ flexgrow: 1, textAlign: 'center' }}
                                >
                                    Obtainable creatures!!
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography
                                    variant="h5"
                                    sx={{ flexgrow: 1, textAlign: 'center' }}
                                >
                                    Filters
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <CreatureList type="all" allDay/>
                            </Grid>
                        </Grid>
                    </section>
                </ThemeProvider>
            </>
        );
    }
}

export default Index;
