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
                        className="app-bar-text"
                        sx={{
                            flexgrow: 1,
                            m: 1,
                            fontFamily: 'FinkHeavy',
                            fontSize: '1.5rem',
                            marginBottom: 0,
                            letterSpacing: '2px',
                            wordSpacing: '7px',
                        }}
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
