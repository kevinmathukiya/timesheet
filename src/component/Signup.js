import React, { useState } from 'react'
import { FormLabel, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import './Mix.css'
import * as Yup from 'yup';

export default function Signup() {
    const [signupuser, setSignupuser] = useState('')

    const navigate = useNavigate()

    const signupdatauser = (signupdata) => {
        if (signupdata !== '') {
            const existingData = JSON.parse(localStorage.getItem('signupuser')) || [];
            const signupupdatedData = [...existingData, signupdata];
            localStorage.setItem('signupuser', JSON.stringify(signupupdatedData));
            setTimeout(() => {
                return navigate('/')
            }, 1000);
        }
    }

    const signupValue = {
        fullname: '',
        email: '',
        password: '',
    }

    return (
        <div className='firstBox'>
            <div className="box">
                <span></span>
                <div className='secondbox'>
                    <Typography className='formheading'>Signup Form</Typography>
                    <Formik
                        initialValues={signupValue}
                        validationSchema={Yup.object({
                            fullname: Yup.string().matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
                                'Name can only contain Latin letters.'
                            ).matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Please enter your full name.').required('** required'),
                            email: Yup.string().email('Invalid email address').required('Required'),
                            password: Yup.string().required('No password provided.')
                                .min(8, 'Password is too short - should be 8 chars minimum.')
                                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
                        })}
                        onSubmit={(values, action) => {
                            setSignupuser(values)
                            signupdatauser(values)
                            action.resetForm()
                        }}>
                        {({
                            values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
                        }) => (
                            <Form className='formpage' onSubmit={handleSubmit}>
                                <FormLabel className='formlabel'>Full Name</FormLabel>
                                <Field className='formfield' values={values?.password} onChange={handleChange} onBlur={handleBlur} type="text" name='fullname' />
                                {errors.fullname && touched.fullname && errors.fullname}

                                <FormLabel className='formlabel'>Email</FormLabel>
                                <Field className='formfield' onChange={handleChange} onBlur={handleBlur} values={values?.email} type="text" name='email' />
                                {errors.email && touched.email && errors.email}

                                <FormLabel className='formlabel'>Password</FormLabel>
                                <Field className='formfield' onChange={handleChange} onBlur={handleBlur}
                                    values={values.password} type="password" name='password' />
                                {errors.password && touched.password && errors.password}

                                <button className='formbutton' variant="contained" disabled={isSubmitting} type='submit'>Signup</button>
                            </Form>
                        )}

                    </Formik>

                    <Typography>Already have a account? <Link to='/'>Login</Link></Typography>
                </div>
            </div>
            <div className="border-blur"></div>
        </div>
    )
}
