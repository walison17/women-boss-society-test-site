import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import FormContext from './context'

const Form = ({ children, onSubmit, onChange, errors }) => {
    const [values, setValues] = useState({})
    const handleSubmit = useCallback(
        e => {
            e.preventDefault()
            onSubmit(values)
        },
        [onSubmit, values]
    )
    const context = {
        values,
        errors,
        handleChange: ({ target: { name: field, value } }) => {
            const data = { ...values, [field]: value }
            onChange({ field, value, data })
            setValues({ ...data, [field]: value })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <FormContext.Provider value={context}>
                {children}
            </FormContext.Provider>
        </form>
    )
}

Form.defaultProps = {
    onSubmit: () => undefined,
    onChange: () => undefined,
    errors: {}
}

Form.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    errors: PropTypes.shape({})
}

export default Form