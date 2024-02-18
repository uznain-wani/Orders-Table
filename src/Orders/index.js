// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { Row, Col } from 'reactstrap'




// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTableOfOrders from './table'

const OrdersTable = () => {
  return (
    <Fragment>
     
      <Row>
       
        <Col sm='12'>
          <DataTableOfOrders />
        </Col>
      </Row>
    </Fragment>
  )
}

export default OrdersTable
