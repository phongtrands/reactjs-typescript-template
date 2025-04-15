import { Button } from "@mui/material";

const DefaultButton = ({value = ''}) => {

    return(
        <Button className="ms-1" variant="outlined"  color="inherit">{value}</Button>
    )
}

export default DefaultButton;