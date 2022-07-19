import { Paper, Typography } from '@mui/material';

const Header = (props) => {
    const { text } = props;

    return (
        <Paper
            elevation={16}
            sx={{
                opacity: '90%',
                backgroundColor: '#66ffa6',
                margin: '1em 0',
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    flexgrow: 1,
                    textAlign: 'center',
                }}
            >
                {text}
            </Typography>
        </Paper>
    );
};

export default Header;
