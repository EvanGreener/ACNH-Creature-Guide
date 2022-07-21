import {
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    SelectChangeEvent,
} from '@mui/material'
import { SyntheticEvent } from 'react'
import { Region, Type, SortBy } from '../pages/Main'

interface Props {
    region: Region
    type: Type
    sortBy: SortBy
    handleChangeRegion: (event: SelectChangeEvent<Region>) => void
    handleChangeType: (event: SelectChangeEvent<Type>) => void
    handleChangeSoryBy: (event: SelectChangeEvent<SortBy>) => void
    handleChangeAllDay: (
        event: SyntheticEvent<Element, Event>,
        checked: boolean
    ) => void
}

const Settings = ({
    region,
    type,
    sortBy,
    handleChangeRegion,
    handleChangeType,
    handleChangeSoryBy,
    handleChangeAllDay,
}: Props) => {
    return (
        <Paper
            elevation={12}
            className="paper-content"
            sx={{ backgroundColor: '#4caf50' }}
        >
            <FormControl sx={{ m: 1 }}>
                <InputLabel>Region</InputLabel>
                <Select
                    label="Region"
                    onChange={handleChangeRegion}
                    value={region}
                >
                    <MenuItem value={Region.NORTH}>North</MenuItem>
                    <MenuItem value={Region.SOUTH}>South</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
                <InputLabel>Type</InputLabel>
                <Select label="Type" onChange={handleChangeType} value={type}>
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
                    onChange={handleChangeSoryBy}
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
                onChange={handleChangeAllDay}
                sx={{ m: 1 }}
            />
        </Paper>
    )
}

export default Settings
