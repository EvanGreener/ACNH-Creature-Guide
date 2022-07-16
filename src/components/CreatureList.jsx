import { Paper } from '@mui/material';
import React, { Component } from 'react';
import { FixedSizeList } from 'react-window';
import { Region, SortBy, Type } from '../views/index';
import { Backdrop, CircularProgress } from '@mui/material';
import Creature from './Creature';

class CreatureList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // creatureType: props.type,
            // region: props.region,
            // sortBy: props.sortBy,
            // allDay: props.allDay,
            fetchingData: true,
            fish: [],
            sea: [],
            bugs: [],
            shown: [],
        };
    }

    componentDidMount() {
        fetch('https://acnhapi.com/v1a/fish')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                this.setState({ fish: data });
            });

        fetch('https://acnhapi.com/v1a/sea')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                this.setState({ sea: data });
            });

        fetch('https://acnhapi.com/v1a/bugs')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                this.setState({ bugs: data, fetchingData: false });
            });

        setInterval(this.updateShown, 1000);
    }

    updateShown = () => {
        const { fish, sea, bugs } = this.state;
        const { allDay, type, region, sortBy } = this.props;
        let temp = [];
        switch (type) {
            case Type.FISH:
                temp = [...fish];
                break;
            case Type.SEA:
                temp = [...sea];
                break;
            case Type.BUGS:
                temp = [...bugs];
                break;
            default:
                temp = [...fish, ...bugs, ...sea];
                break;
        }

        const newShown = temp.filter((creature) => {
            // console.log(creature);
            const { availability } = creature;
            const monthArr =
                region === Region.NORTH
                    ? availability['month-array-northern']
                    : availability['month-array-southern'];
            const timeArr = availability['time-array'];

            const currentDate = new Date();
            const currentHour = currentDate.getHours();
            const currentMonth = currentDate.getMonth();

            if (allDay) {
                return (
                    monthArr.includes(currentMonth) &&
                    timeArr.includes(currentHour)
                );
            } else {
                return (
                    monthArr.includes(currentMonth) &&
                    timeArr.includes(currentHour) &&
                    !availability.isAllDay
                );
            }
        });

        switch (sortBy) {
            case SortBy.PRICE:
                newShown.sort((a, b) => a.price - b.price);
                newShown.reverse();
                break;
            case SortBy.NAME:
                newShown.sort((a, b) =>
                    a.name['name-USen'].localeCompare(b.name['name-USen'])
                );
                break;
            case SortBy.LOCATION:
                newShown.sort((a, b) =>
                    a.availability.location.localeCompare(
                        b.availability.location
                    )
                );
                break;
            default: // default is by ID
                break;
        }

        console.log(newShown);
        this.setState({
            shown: newShown,
        });
    };

    render() {
        const { shown, fetchingData } = this.state;
        const { type } = this.props;
        return (
            <>
                <Paper
                    elevation={12}
                    sx={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: '#4caf50',
                        opacity: '90%',
                    }}
                >
                    <FixedSizeList
                        height={400}
                        width="100%"
                        itemSize={60}
                        itemCount={shown.length}
                        itemData={shown}
                        itemKey={(index, data) => {
                            return data[index]['file-name'] + '_' + type;
                        }}
                    >
                        {Creature}
                    </FixedSizeList>
                </Paper>
                <Backdrop
                    sx={{
                        color: '#fff',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={fetchingData}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>
        );
    }
}

export default CreatureList;
