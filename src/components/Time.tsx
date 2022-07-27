import { Typography, Box, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import configData from '../config.json'

const Time = () => {
    const { PRIMARY_BG, PRIMARY_TEXT } = configData.THEME_COLORS
    const [time, setTime] = useState<Date>(new Date())

    useEffect(() => {
        setInterval(() => {
            setTime(new Date())
        }, 1000)
    })
    let hours: string | number = time.getHours()
    let mins: string | number = time.getMinutes()
    let secs: string | number = time.getSeconds()
    const amPm = hours < 12 ? 'am' : 'pm'
    hours %= 12

    hours = hours === 0 ? 12 : hours
    mins = mins < 10 ? '0' + mins : mins
    secs = secs < 10 ? '0' + secs : secs
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Paper
                elevation={12}
                className="time"
                sx={{ backgroundColor: PRIMARY_TEXT }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: PRIMARY_BG,
                        fontFamily: 'FinkHeavy',
                        mx: 1,
                        my: 0.5,
                    }}
                >
                    {hours + ':' + mins + ':' + secs + amPm}
                </Typography>
            </Paper>
        </Box>
    )
}

export default Time
