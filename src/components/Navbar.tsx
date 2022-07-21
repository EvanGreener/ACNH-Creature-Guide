import { AppBar, Toolbar, Typography } from '@mui/material'

interface Props {
    logoSrc: string
    text: string
}

const Navbar = ({ logoSrc, text }: Props) => {
    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <img
                        src={logoSrc}
                        alt="App bar logo"
                        height={40}
                        width={40}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexgrow: 1, m: 1 }}
                    >
                        {text}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}

export default Navbar
