import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom/dist';
import * as Yup from 'yup';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';

export default function Dashboard() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [userdata, setUserdata] = useState(JSON.parse(localStorage.getItem('timesheet')))
    const [searchQuery, setSearchQuery] = useState('');
    const TableHeadData = ['NAME', 'DATE', 'PROJECT NAME', 'EMAIL', 'STORY', 'START TIME', 'END TIME', 'TASK', 'TOTAL']
    const [no, setNo] = useState('')
    const isLoggedIn = JSON.parse(localStorage.getItem('login'));
    const [formObj, setformObj] = useState({ developername: isLoggedIn.fullname, date: '', projectname: '', email: '', storydata: [{ story: '', starttime: '', endtime: '', task: '' }], total: '' })

    const filteredData = userdata?.filter((row) => {
        return isLoggedIn.fullname === row.developername && Object.values(row).toString().toLowerCase().includes(searchQuery.toLowerCase());
    });

    const EditUSer = (ids) => {
        const editDataSet = filteredData[ids]
        setNo(ids)
        setOpen(true);
        setformObj(editDataSet)
    }

    const FormUser = (tablevalue) => {
        if (no >= 0) {
            userdata[no] = tablevalue;
            localStorage.setItem('timesheet', JSON.stringify(userdata));
            setUserdata(userdata);
        } else {
            const TimesheetData = JSON.parse(localStorage.getItem('timesheet')) || [];
            const TimesheetAddData = [...TimesheetData, tablevalue];
            localStorage.setItem('timesheet', JSON.stringify(TimesheetAddData));
            setUserdata(TimesheetAddData);
        }
        setOpen(false);
    }

    const Logout = () => {
        localStorage.removeItem('login');
        navigate('/')
    }

    const AddmoreButton = () => {
        setformObj((prevState) => {
            return { ...prevState, storydata: [...formObj.storydata, { story: '', starttime: '', endtime: '', task: '', }] };
        })
    }

    const RemoveButton = () => {
        setformObj((prevState) => {
            if (prevState.storydata.length > 1) {
                const newStoryData = [...prevState.storydata];
                newStoryData.pop();
                return { ...prevState, storydata: newStoryData };
            }
        });
    }

    return (
        <div>
            <ButtonDiv>
                <ButtonCss onClick={() => setOpen(true)}>Add Data</ButtonCss>
                <ButtonCss onClick={() => navigate('/alldata')} >All Data</ButtonCss>
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
                <ButtonCss onClick={Logout}>LOGOUT</ButtonCss>
            </ButtonDiv>
            <WelcomeTittle>{isLoggedIn.fullname}</WelcomeTittle>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500, }, }}
            >
                <Fade in={open}>
                    <Box sx={Boxstyle}>
                        <Formik
                            initialValues={formObj}
                            validationSchema={Yup.object({
                                date: Yup.string().required('** required'),
                                projectname: Yup.string().required('** required'),
                                email: Yup.string().email('Invalid email address').required('** required'),
                                storydata: Yup.array().of(
                                    Yup.object().shape({
                                        story: Yup.string().required('** required'),
                                        starttime: Yup.string().required('** required'),
                                        endtime: Yup.string().required('** required'),
                                        task: Yup.string().required('** required'),
                                    })
                                ).required('At least one story is required'),
                                total: Yup.string().required('** required'),
                            })}
                            onSubmit={(value) => {
                                FormUser(value)
                                setOpen(false)
                            }}>
                            {({
                                values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
                            }) => (
                                <TableForm onSubmit={handleSubmit}>
                                    <HeadingForm>daily time sheet</HeadingForm>

                                    <FormTextField InputLabelProps={{ shrink: true }} type='text' name='developername' value={values?.developername} label="Developer Name" />

                                    <FormTextField InputLabelProps={{ shrink: true }} type='date' name='date' value={values?.date} onBlur={handleBlur} onChange={handleChange} label="Date" />
                                    {errors.date && touched.date ? <Error>{errors.date}</Error> : null}

                                    <FormTextField InputLabelProps={{ shrink: true }} type='text' name='projectname' value={values?.projectname} onBlur={handleBlur} onChange={handleChange} label="Project Name" />
                                    {errors.projectname && touched.projectname ? <Error>{errors.projectname}</Error> : null}

                                    <FormTextField InputLabelProps={{ shrink: true }} type='email' name='email' value={values?.email} onBlur={handleBlur} onChange={handleChange} label="Email" />
                                    {errors.email && touched.email ? <Error>{errors.email}</Error> : null}

                                    {formObj?.storydata?.map((e, index) => {
                                        return <>
                                            <FormTextField InputLabelProps={{ shrink: true }} type='text' name={`storydata[${index}].story`} value={e?.story} onBlur={handleBlur} onChange={handleChange} label="Story" />
                                            {errors.storydata && touched.storydata && errors.storydata[index]?.story && touched.storydata[index]?.story ? <Error>{errors.storydata[index]?.story}</Error> : null}
                                            <TimeDiv>
                                                <Typography>
                                                    <DateStratEnd InputLabelProps={{ shrink: true }} type='time' name={`storydata[${index}].starttime`} value={e?.starttime} onBlur={handleBlur} onChange={handleChange} label="Start Time" />
                                                    {errors.storydata && touched.storydata && errors.storydata[index]?.starttime && touched.storydata[index]?.starttime ? <Error>{errors.storydata[index]?.starttime}</Error> : null}
                                                </Typography>
                                                <Typography>
                                                    <DateStratEnd InputLabelProps={{ shrink: true }} type='time' name={`storydata[${index}].endtime`} value={e?.endtime} onBlur={handleBlur} onChange={handleChange} label="End Time" />
                                                    {errors.storydata && touched.storydata && errors.storydata[index]?.endtime && touched.storydata[index]?.endtime ? <Error>{errors.storydata[index]?.endtime}</Error> : null}
                                                </Typography>
                                            </TimeDiv>

                                            <FormTextField InputLabelProps={{ shrink: true }} type='text' name={`storydata[${index}].task`} value={e?.task} onBlur={handleBlur} onChange={handleChange} label="Task" />
                                            {errors.storydata && touched.storydata && errors.storydata[index]?.task && touched.storydata[index]?.task ? <Error>{errors.storydata[index]?.task}</Error> : null}
                                        </>
                                    })}
                                    {formObj.storydata.length ?
                                        <MoreFiledandremoveDiv>
                                            <AddOtherStoryandRemove onClick={AddmoreButton}>add other story</AddOtherStoryandRemove>
                                            {formObj.storydata.length > 1 ? <AddOtherStoryandRemove onClick={RemoveButton}>remove</AddOtherStoryandRemove> : ''}
                                        </MoreFiledandremoveDiv> : ''
                                    }

                                    <FormTextField InputLabelProps={{ shrink: true }} type='time' name='total' value={values.total} onBlur={handleBlur} onChange={handleChange} label="Total" />
                                    {errors.total && touched.total ? <Error>{errors.total}</Error> : null}
                                    <AddButton variant="contained" disabled={isSubmitting} type='submit'>add</AddButton>
                                </TableForm>
                            )}
                        </Formik>
                    </Box>
                </Fade>
            </Modal>

            <div>
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
                            {filteredData?.map((row, index) => (
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
                                                <>
                                                    <UserTableBody align="center" rowSpan={row.storydata.length}>{row.total}</UserTableBody>
                                                </>
                                            )}
                                        </TableRow>
                                    ))}
                                    <EditIcon sx={{ color: 'blue', position: 'absolute', right: '22px', marginTop: '-40px' }} onClick={() => EditUSer(index)} />
                                </React.Fragment>

                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );

}

const ButtonDiv = styled(Typography)({
    display: 'flex',
    justifyContent: 'space-between',
    margin: "20px 20px"
});

const ButtonCss = styled(Button)({
    fontSize: '20px',
    fontWeight: 'bold',
});

const Boxstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 450,
    bgcolor: 'background.paper',
    // border: '1px solid #2cacc1',
    boxShadow: 24,
    p: 3,
    borderRadius: '15px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
        width: '0em'
    },
    '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey'
    }

};

const WelcomeTittle = styled('div')({
    textAlign: 'center',
    padding: '20px 0px',
    fontSize: '30px',
    fontWeight: 'bold'

});

const HeadingForm = styled(Typography)({
    textAlign: 'center',
    margin: '1em 0 0.5em 0',
    color: '#343434',
    fontWeight: 'normal',
    fontSize: '36px',
    lineHeight: '42px',
    textTransform: 'uppercase',
    textShadow: '0 2px white, 0 3px #777',
});

const TimeDiv = styled(Typography)({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '40px'
});

const DateStratEnd = styled(TextField)({
    width: '150px',
});

const TableForm = styled(Form)({
    display: 'flex',
    flexDirection: 'column',
});

const FormTextField = styled(TextField)({
    marginTop: '30px',
});

const MoreFiledandremoveDiv = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    gap: '50px'
})
const AddOtherStoryandRemove = styled(Button)({
    textAlign: 'center',
    "&:hover": {
        background: 'none',
    },
});

const AddButton = styled(Button)({
    marginTop: '30px',
    fontWeight: 'bold',
});

const UserTableHead = styled(TableCell)({
    fontWeight: 'bold',
    fontSize: '18px',
});

const UserTableBody = styled(TableCell)({
    textAlign: 'start',
});

const Error = styled(Typography)({
    color: 'red',
    paddingTop: '5px',
    fontSize: '15px',
    fontWeight: 'bold'
});

