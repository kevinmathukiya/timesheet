import { FormLabel, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logingif from './giphy.gif'
import './Mix.css'
import * as Yup from 'yup';
import { useState } from 'react'

export default function Login() {
    const [error, setError] = useState({ status: false, msg: "", type: "" })
    const loginValue = {
        email: '',
        password: '',
    }

    const navigate = useNavigate();
    const getdatasignup = JSON.parse(localStorage.getItem('signupuser'))

    const loginvalidation = (loginvalues) => {
        if (getdatasignup) {
            let user = getdatasignup.find((e) => e.email === loginvalues.email)
            if (user) {
                if (user.password === loginvalues.password) {
                    const loggding = user
                    localStorage.setItem('login', JSON.stringify(loggding))
                    navigate('/dashboard')
                } else {
                    setError({ status: true, msg: "invalid password", type: "invalid" })
                }
            } else {
                setError({ status: true, msg: "user not found need to signup ", type: "not_signup" })
            }
        } else {
            setError({ status: true, msg: "user not found need to signup", type: "not_signup" })
        }
    }

    return (
        <div className='firstBox'>
            <div className="box">
                <span></span>
                <div className='secondbox'>
                    <Typography className='formheading'>Login Form</Typography>
                    <img className='loginimage' src={Logingif} />
                    <Formik
                        initialValues={loginValue}
                        validationSchema={Yup.object({
                            email: Yup.string().email('Invalid email address').required('Required'),
                            password: Yup.string().required('No password provided.')
                                .min(8, 'Password is too short - should be 8 chars minimum.')
                                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
                        })}
                        onSubmit={(values, action) => {
                            loginvalidation(values)
                            action.resetForm()
                        }}>
                        {({
                            values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,
                        }) => (
                            <Form className='formpage' onSubmit={handleSubmit}>
                                <FormLabel className='formlabel'>Email</FormLabel>
                                <Field className='formfield' values={values?.email} onBlur={handleBlur} onChange={handleChange} type="email" name='email' />
                                {errors.email && touched.email && errors.email}

                                <FormLabel className='formlabel'>Password</FormLabel>
                                <Field className='formfield' values={values?.password} onBlur={handleBlur} type="password" onChange={handleChange} name='password' />
                                {errors.password && touched.password && errors.password}

                                <button className='formbutton' variant="contained" disabled={isSubmitting} type='submit'>Login</button>
                            </Form>
                        )}
                    </Formik>
                    <Typography>Not Yet member? <Link to='/signup'>signup</Link></Typography>
                    <Typography className='errorlogin'>{error?.msg}</Typography>
                </div>
            </div>
            <div className="border-blur"></div>
        </div>
    )
}
