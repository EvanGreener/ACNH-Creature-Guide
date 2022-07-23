import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Typography,
    Switch,
    SelectChangeEvent,
    Button,
    Popper,
    Zoom,
    useMediaQuery,
} from '@mui/material'
import { MouseEventHandler, SyntheticEvent, useState } from 'react'
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
    const [open, setOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)

    const handleClick: MouseEventHandler = (event) => {
        setOpen(!open)
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }

    const mq = useMediaQuery('(min-width: 600px)')

    const dialogueH = mq ? '12vw' : '33vw'
    const dialogueW = mq ? '36vw' : '99vw'

    return (
        <>
            <Button variant="contained" onClick={handleClick} sx={{ m: 1 }}>
                Filter
            </Button>
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom"
                transition
            >
                {({ TransitionProps }) => (
                    <Zoom {...TransitionProps} timeout={250}>
                        <Box
                            className="settings"
                            sx={{
                                minHeight: dialogueH,
                                minWidth: dialogueW,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FormControl sx={{ m: 1 }}>
                                <InputLabel>Region</InputLabel>
                                <Select
                                    label="Region"
                                    onChange={handleChangeRegion}
                                    value={region}
                                    autoWidth
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
                            <FormControl sx={{ m: 1 }}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    label="Type"
                                    onChange={handleChangeType}
                                    value={type}
                                    autoWidth
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
                            <FormControl sx={{ m: 1 }}>
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    label="Sort By:"
                                    value={sortBy}
                                    onChange={handleChangeSoryBy}
                                    autoWidth
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
                            <FormControlLabel
                                control={<Switch defaultChecked />}
                                label="All day"
                                onChange={handleChangeAllDay}
                            />
                        </Box>
                    </Zoom>
                )}
            </Popper>
        </>
    )
}

export default Settings
