import {
    Box,
    FormControl,
    InputLabel,
    Select,
    Grid,
    MenuItem,
    FormControlLabel,
    Typography,
    Switch,
    SelectChangeEvent,
    Button,
    Popover,
} from '@mui/material'
import { MouseEventHandler, SyntheticEvent, useState } from 'react'
import { Region, Type, SortBy } from '../pages/Main'
import dialogueImg from '../assets/dialogue2.png'
import config from '../config.json'

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
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)
    const { ALL_DAY_TEXT } = config
    const { DIALOGUE_HEIGHT, DIALOGUE_WIDTH } = config.DIMENS
    const handleClick: MouseEventHandler = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }
    const handleClose = () => setAnchorEl(null)
    const open = Boolean(anchorEl)

    const margin = 5

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClick}
                sx={{ my: 1, typography: 'body2' }}
            >
                Filter
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                marginThreshold={0}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        backgroundImage: `url(${dialogueImg})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'transparent',
                        minHeight: DIALOGUE_HEIGHT,
                        minWidth: DIALOGUE_WIDTH,
                    },
                }}
            >
                <Box sx={{ mx: 5 }}>
                    <Grid container>
                        <Grid item xs={3}>
                            <FormControl sx={{ my: margin }}>
                                <InputLabel>Region</InputLabel>
                                <Select
                                    label="Region"
                                    onChange={handleChangeRegion}
                                    value={region}
                                >
                                    <MenuItem value={Region.NORTH}>
                                        <Typography variant="body2">
                                            North
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={Region.SOUTH}>
                                        <Typography variant="body2">
                                            South
                                        </Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl sx={{ my: margin }}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    label="Type"
                                    onChange={handleChangeType}
                                    value={type}
                                >
                                    <MenuItem value={Type.ALL}>
                                        <Typography variant="body2">
                                            All
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={Type.SEA}>
                                        <Typography variant="body2">
                                            Sea
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={Type.FISH}>
                                        <Typography variant="body2">
                                            Fish
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={Type.BUGS}>
                                        <Typography variant="body2">
                                            Bugs
                                        </Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl sx={{ my: margin }}>
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    label="Sort By:"
                                    value={sortBy}
                                    onChange={handleChangeSoryBy}
                                >
                                    <MenuItem value={SortBy.PRICE}>
                                        <Typography variant="body2">
                                            Price
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={SortBy.LOCATION}>
                                        <Typography variant="body2">
                                            Location
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={SortBy.NAME}>
                                        <Typography variant="body2">
                                            Name
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem value={SortBy.NONE}>
                                        <Typography variant="body2">
                                            None
                                        </Typography>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControlLabel
                                sx={{ my: margin }}
                                control={<Switch defaultChecked />}
                                label={ALL_DAY_TEXT}
                                onChange={handleChangeAllDay}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
        </>
    )
}

export default Settings
