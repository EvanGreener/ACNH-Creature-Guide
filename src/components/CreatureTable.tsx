import { Paper } from '@mui/material'
import { FixedSizeList } from 'react-window'
import { Region, SortBy, Type } from '../pages/Main'
import { Backdrop, CircularProgress } from '@mui/material'
import CreatureRow, { Creature } from './CreatureRow'
import { useState } from 'react'
import { useEffect } from 'react'
import config from '../config.json'

interface Props {
    allDay: boolean
    type: Type
    region: Region
    sortBy: SortBy
}

const CreatureList = ({ allDay, type, region, sortBy }: Props) => {
    const [fetchingData, setFetchingData] = useState<boolean>(true)
    const [fish, setFish] = useState<Creature[]>([])
    const [sea, setSea] = useState<Creature[]>([])
    const [bugs, setBugs] = useState<Creature[]>([])
    const [shown, setShown] = useState<Creature[]>([])

    const { BUGS, FISH, SEA } = config.API
    const { SEA_LOCATION_TEXT } = config
    const { ROW_HEIGHT } = config.DIMENS

    // Function to update the creatures currently being shown
    useEffect(() => {
        // Filter by creature type
        let temp = []
        switch (type) {
            case Type.FISH:
                temp = [...fish]
                break
            case Type.SEA:
                temp = [...sea]
                break
            case Type.BUGS:
                temp = [...bugs]
                break
            default:
                temp = [...fish, ...bugs, ...sea]
                break
        }

        // Only keep the creatures presently availible based on region and time
        const newShown = temp.filter((creature) => {
            // console.log(creature);
            const { availability } = creature
            const monthArr =
                region === Region.NORTH
                    ? availability['month-array-northern']
                    : availability['month-array-southern']
            const timeArr = availability['time-array']

            const currentDate = new Date()
            const currentHour = currentDate.getHours()
            const currentMonth = currentDate.getMonth()

            if (allDay) {
                return (
                    monthArr.includes(currentMonth) &&
                    timeArr.includes(currentHour)
                )
            } else {
                return (
                    monthArr.includes(currentMonth) &&
                    timeArr.includes(currentHour) &&
                    !availability.isAllDay
                )
            }
        })

        // Finally sort the new list based on what the user specifies in select menu
        switch (sortBy) {
            case SortBy.PRICE:
                newShown.sort((a, b) => a.price - b.price)
                newShown.reverse()
                break
            case SortBy.NAME:
                newShown.sort((a, b) =>
                    a.name['name-USen'].localeCompare(b.name['name-USen'])
                )
                break
            case SortBy.LOCATION:
                newShown.sort((a, b) => {
                    const locationA = a.availability.location
                    const locationB = b.availability.location
                    if (locationA && locationB) {
                        return locationA.localeCompare(locationB)
                    } else if (locationA) {
                        return locationA.localeCompare(SEA_LOCATION_TEXT)
                    } else if (locationB) {
                        return SEA_LOCATION_TEXT.localeCompare(locationB)
                    } else {
                        return 0
                    }
                })
                break
            default: // default is by ID
                break
        }

        // Hacky way of adding header
        // Values don't really matter, see CreatureRow.tsx
        newShown.unshift({
            name: {
                'name-USen': '',
            },
            price: -1,
            shadow: '',
            availability: {
                time: '',
                location: '',
                'month-array-northern': [0],
                'month-array-southern': [0],
                'time-array': [0],
                isAllDay: false,
            },
            icon_uri: '',
            'file-name': '',
        })

        setShown(newShown)
    }, [allDay, sortBy, type, region, fish, sea, bugs, SEA_LOCATION_TEXT])

    useEffect(() => {
        let mounted = true
        // Fetch all the creatures and store them in the state object
        fetch(FISH)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then((data) => {
                if (mounted) {
                    setFish(data)
                }
            })

        fetch(SEA)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then((data) => {
                if (mounted) {
                    setSea(data)
                }
            })

        fetch(BUGS)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then((data) => {
                if (mounted) {
                    setBugs(data)
                    setFetchingData(false)
                }
            })
        return () => {
            mounted = false
        }
    })

    return (
        <>
            <Paper elevation={12}>
                <FixedSizeList
                    height={400}
                    width="100%"
                    itemSize={ROW_HEIGHT}
                    itemCount={shown.length}
                    itemData={shown}
                    itemKey={(index, data) => {
                        return data[index]['file-name'] + '_' + type
                    }}
                >
                    {CreatureRow}
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
    )
}

export default CreatureList
