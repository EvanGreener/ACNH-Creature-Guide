// import { Paper, Typography } from '@mui/material'
import header from '../assets/header2.png'

interface Props {
    text: string
}

const Header = ({ text }: Props) => {
    return (
        <img
            src={header}
            alt="header"
            width="70%"
            style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        />
        // <Paper
        //     elevation={16}
        //     sx={{
        //         margin: '1em 0',
        //         paddingTop: 1,
        //     }}
        // >
        //     <Typography
        //         variant="h4"
        //         sx={{
        //             flexgrow: 1,
        //             textAlign: 'center',
        //             fontFamily: 'FinkHeavy',
        //             letterSpacing: '4px',
        //             wordSpacing: '17px',
        //         }}
        //     >
        //         {text}
        //     </Typography>
        // </Paper>
    )
}

export default Header
