import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

const DefaultDropDown = () => {

    const menuData = [
        'BMCS',
        'Menu2',
        'Menu3',
    ];
    const [value, setValue] = React.useState(menuData[0]);
    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
      };

    return(
            <Select
            id="default-dropdown"
            className="default-dropdown"
            value={value}
            onChange={handleChange}
            >
                {menuData.map((item) => (
                    <MenuItem
                    key={item}
                    value={item}
                    >
                    {item}
                    </MenuItem>
                ))}
            </Select>

    );
};

export default DefaultDropDown;