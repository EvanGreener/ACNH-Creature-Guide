import { AppBar, Toolbar, Typography } from '@mui/material'

interface Props {
    logoSrc: string
    text: string
}

const Navbar = ({ logoSrc, text }: Props) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <img src={logoSrc} alt="App bar logo" height={50} width={50} />
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ flexgrow: 1, m: 1 }}
                >
                    {text}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
