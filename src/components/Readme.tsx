import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { forwardRef, ReactElement, Ref, useState } from 'react'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>
    },
    ref: Ref<unknown>
) {
    return <Slide direction="right" ref={ref} {...props} />
})

const Readme = () => {
    const [open, setOpen] = useState(false)
    const handleClick = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClick}
                sx={{ mr: 1, my: 1, typography: 'body2' }}
            >
                READ ME!
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>{`Instructions:`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This app a cheat sheet of of all the creatures presently
                        available based on your Island's hemisphere/region and
                        time. To set your Island's hemisphere click on the
                        'Filter' button and select your hemisphere in the Region
                        dropdown menu. If you're on mobile, turn it sideways to
                        also see the creatures shadow size {'('}if applicable
                        {')'} and availability throughout the day.
                        <br />
                        <br />
                        Disclaimer: ACNH Creature Guide is a fan-made website
                        and claims no ownership of any intellectual property
                        associated with Nintendo or Animal Crossing. All assets
                        used on my website and the repository are the sole
                        property of Nintendo and are only used for
                        non-commercial and eduacational purposes.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Readme
