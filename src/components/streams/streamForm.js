import React from 'react'
import { Field, reduxForm } from 'redux-form'

const StreamForm = (props) => {
    const onSubmit = (formValues) => {
        console.log(props);
        props.onSubmit(formValues)
    }

    return (
        <form className="ui form error" onSubmit={props.handleSubmit(onSubmit)} >
            <Field name="title" component={renderInput} label='Enter Title' />
            <Field name="description" component={renderInput} label='Enter Description' />

            <button type='submit' className="ui button primary">Submit</button>
        </form>
    )
}

const renderError = ({ error, touched }) => {

    if (touched && error) {
        return (
            <div className="ui error message">
                <div className="header">  {error}</div>
            </div>
        )
    }
}

const renderInput = (formProps) => {
    const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`
    return (
        <div className={className}>
            <label>{formProps.label}</label>
            <input {...formProps.input} autoComplete='off' />
            {renderError(formProps.meta)}
        </div>
    )
}



const validate = formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'you must enter a title'
    }
    if (!formValues.description) {
        errors.description = 'you must enter a description'
    }
    return errors
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm)

