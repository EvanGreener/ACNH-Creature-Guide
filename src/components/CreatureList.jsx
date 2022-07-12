import { Paper } from '@mui/material';
import React, { Component } from 'react';
import { FixedSizeList } from 'react-window';

class CreatureList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creatureType: props.creatureType,
            fetchingData: true,
            fish: [],
            sea: [],
            bugs: [],
            shown: [],
        };
    }


    componentDidMount() {
        fetch('http://acnhapi/v1/fish')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                this.setState({ fish: data });
            });

        fetch('http://acnhapi/v1/sea')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                this.setState({ sea: data });
            });

        fetch('http://acnhapi/v1/bugs')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                this.setState({ bugs: data, fetchingData: false });
            });

        setInterval(this.updateShown, 500);
    }

    updateShown() {
        const {fish, sea, bugs} = this.state
        
    }

    render() {
        return (
            <Paper
                elevation={12}
                sx={{
                    height: 400,
                    width: '90%',
                    backgroundColor: '#4caf50',
                }}
            >
                <FixedSizeList
                    height={400}
                    width="100%"
                    itemSize={60}
                    itemCount={this.state.shown.length}
                ></FixedSizeList>
            </Paper>
        );
    }
}

export default CreatureList;
