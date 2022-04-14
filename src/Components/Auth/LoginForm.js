import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import '../FormStyles.css';
import { loginUser } from '../../Services/UsersHTTPService';
import showAlert from '../../shared/showAlert';

const LoginForm = () => {
	return (
		<>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				onSubmit={({ email, password }, { resetForm }) => {
					resetForm();
					try {
						loginUser({ email, password });
					} catch (err) {
						showAlert({
							type: err,
							title: 'Ups, hubo un error',
							message:
								'No has podido ingresar a tu cuenta, intentelo mas tarde',
						});
					}
				}}
				validate={values => {
					const errors = {};
					// validate email
					if (!values.email) {
						errors.email = 'El email es obligatorio';
					} else if (
						!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
							values.email
						)
					) {
						errors.email = 'Escriba un correo válido';
					}

					// validate password
					if (!values.password) {
						errors.password = 'La contraseña es obligatoria';
					} else if (
						!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{6,15}$/.test(
							values.password
						)
					) {
						errors.password =
							'La contraseña debe terner mínimo 6 caracteres, contener una mayúscula, un número y un carácter especial';
					}
					return errors;
				}}
			>
				{({ errors, handleChange, handleBlur, handleSubmit, values }) => (
					<Form onSubmit={handleSubmit} className='form-container'>
						<Field
							className='input-field'
							type='text'
							name='email'
							placeholder='Email'
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<ErrorMessage
							name='email'
							component={() => (
								<div className='error-message-form'>{errors.email}</div>
							)}
						/>
						<Field
							className='input-field'
							type='password'
							name='password'
							placeholder='Contraseña'
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<ErrorMessage
							name='password'
							component={() => (
								<div className='error-message-form'>{errors.password}</div>
							)}
						/>
						<button className='submit-btn' type='submit'>
							Log In
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default LoginForm;
