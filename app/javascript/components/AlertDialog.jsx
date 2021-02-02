import React from 'react';
import Alert from "react-bootstrap/Alert";


const messages = {
    success: { title: 'The commits were successfully merged!', message: (source, target) => { return `Successfully merged the commit ${source} to ${target}`} },
    danger: { title: 'Error when merging these commits!', essage: (source, target) => { return `Failed when trying to merge commit ${source} to ${target}` }}
}

const AlertDialog = ({ show, severity, onClose, sourceCommit, targetCommit }) => {

    if(show){
        return(
            <Alert variant={severity} onClose={onClose} dismissible>
                <Alert.Heading>{messages[severity].message}</Alert.Heading>
                <p>
                    {messages[severity].message(sourceCommit, targetCommit)}
                </p>
            </Alert>
        )
    }else{
        return(null)
    }


}

export default AlertDialog