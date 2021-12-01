import React from 'react';
import {Row, Col} from 'reactstrap';


const RowBlock = ({left, rigth}) => {
    return (
        <Row>
        <Col md='6'>
            {left}
        </Col>
        <Col md='6'>
            {rigth}
        </Col>
    </Row>
    )
}

export default RowBlock;