import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, FormHelperText, IconButton, InputBase, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styled from '@emotion/styled';


export default function Alldata() {
    const alldataprint = JSON.parse(localStorage.getItem('timesheet'))
    const TableHeadData = ['NAME', 'DATE', 'PROJECT NAME', 'EMAIL', 'STORY', 'START TIME', 'END TIME', 'TASK', 'TOTAL']
    const [searchQuery, setSearchQuery] = useState('');
    const [age, setAge] = React.useState('');


    const filteredData = alldataprint?.filter((row) => {
        return Object.values(row).toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
    
    const handleChange = (event) => {
        setAge(event.target.value);
    };


    return (
        <div>
            {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    {filteredData.map((ele) =>(
                        <MenuItem value={10}>{}</MenuItem>
                    ))}
                </Select>
            </FormControl> */}
            <SearchData>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </SearchData>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {TableHeadData.map((headvalue) => (
                                <UserTableHead>{headvalue}</UserTableHead>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData?.map((row) => (
                            <React.Fragment key={row.date}>
                                {row.storydata.map((add, index) => (
                                    <TableRow key={`${row.date}_${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        {index === 0 && (
                                            <>
                                                <UserTableBody align="center" rowSpan={row.storydata.length}>{row.developername}</UserTableBody>
                                                <UserTableBody align="center" rowSpan={row.storydata.length}>{row.date}</UserTableBody>
                                                <UserTableBody align="center" rowSpan={row.storydata.length}>{row.projectname}</UserTableBody>
                                                <UserTableBody align="center" rowSpan={row.storydata.length}>{row.email}</UserTableBody>
                                            </>
                                        )}
                                        <UserTableBody align="center">{add.story}</UserTableBody>
                                        <UserTableBody align="center">{add.starttime}</UserTableBody>
                                        <UserTableBody align="center">{add.endtime}</UserTableBody>
                                        <UserTableBody align="center">{add.task}</UserTableBody>
                                        {index === 0 && (
                                            <UserTableBody align="center" rowSpan={row.storydata.length}>{row.total}</UserTableBody>
                                        )}
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}


const UserTableHead = styled(TableCell)({
    fontWeight: 'bold',
    fontSize: '18px',
});

const UserTableBody = styled(TableCell)({
    textAlign: 'start',
});

const SearchData = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0px'
})