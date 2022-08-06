import header from '../assets/header2.png'

const Header = () => {
    return (
        <img
            src={header}
            alt="header"
            width="100%"
            style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                // to center it
                maxWidth: '600px',
            }}
        />
    )
}

export default Header
