import React from 'react';
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from 'react-router-dom';

const DepartmentList =({ departments }) =>{
    if(!departments.length){
        return <h3>No Departments</h3>
    }
    return (
         <>test</>
    )
}

export default DepartmentList;