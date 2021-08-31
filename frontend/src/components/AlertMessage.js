import React from 'react'
import { Alert } from 'react-bootstrap'

function AlertMessage({info}) {
    return info ===null ? null : (
        <Alert className="alert-danger" variant={info.type}>{info.message}</Alert>
    )
}

export default AlertMessage