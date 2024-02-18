// ** React Imports
import { Fragment, useState, forwardRef, useEffect } from 'react'

// ** Table Data & Columns
import { data} from './data'

import { Link } from 'react-router-dom'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown,  Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
  CardBody,Badge
} from 'reactstrap'
import AddNewModal from './createModal'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// CustomPagination Component
const CustomPagination = ({ currentPage, handlePagination, pageCount }) => (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  );
  
  

//this is custom header top of table 

const CustomHeader = ({ handlePerPage, rowsPerPage, currentPage, handlePagination, pageCount }) => {
    return (
      <div className='invoice-list-table-header w-100 py-2'>
        <Row>
          <Col lg='6' md='6' sm='12' className='d-flex align-items-center px-0 px-lg-1'>
            <div className='d-flex align-items-center me-2'>
              <h4 style={{fontWeight:"600"}}>Product Summary</h4>
            </div>
         
           
          </Col>
          <Col lg='4' md='6' sm='12' className='d-flex align-items-center px-0 px-lg-1'>
            <div className='d-flex align-items-center me-2'>
              <label htmlFor='rows-per-page' style={{fontWeight:"600"}}>Show</label>
              <Input
                type='select'
                id='rows-per-page'
                value={rowsPerPage}
                onChange={handlePerPage}
                className='form-control ms-50 pe-3'
                style={{width:"170px"}}
              >
                <option value='7'>7</option> 
                <option value='10'>10</option>
                <option value='15'>15</option>
                <option value='20'>20</option>
              </Input>
            </div>
            <Button color='primary' className='me-2'>
              Dispatch Selected
            </Button>
          </Col>
          <Col lg='2' md='6' sm='12' className='d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'>
        
            {/* Use CustomPagination here */}
            <CustomPagination currentPage={currentPage} handlePagination={handlePagination} pageCount={pageCount} />
          </Col>
        </Row>
      </div>
    );
  };
  

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))
const DataTableOfOrders = () => {
 // ** States
 const [modal, setModal] = useState(false);
 const [currentPage, setCurrentPage] = useState(0);
 const [value, setValue] = useState('');
 const [statusValue, setStatusValue] = useState('all');
 const [categoryValue, setCategoryValue] = useState('all');
 const [rowsPerPage, setRowsPerPage] = useState(7);
 const [filteredData, setFilteredData] = useState(data); 
 const [isEdit, setIsEdit] = useState(false)
 const [editData, setEditData] = useState(null)
 const [deletingRowId, setDeletingRowId] = useState(null); 

 
 useEffect(() => {
    handleFilter();
  }, [value, statusValue, categoryValue, rowsPerPage, data]); 
  

 
 //different status values 
 const status = {
        Paid : { title: 'Paid', color: 'light-primary' },
          Pending: { title: 'Pending', color: 'light-success' },
          Shipped: { title: 'Shipped', color: 'light-danger' },
          Refunded: { title: 'Refunded', color: 'light-warning' },
          Completed: { title: 'Completed', color: 'light-info' }
 }
    //colomns to be viewed    
    const columns = [
   
        {
          name: 'ID',
          sortable: true,
          minWidth: '100px',
          selector: row => row.id
        },
        {
            name: 'Shpiify ',
            sortable: false,
            minWidth: '60px',
            selector: row => row.shpiify
          },
        {
          name: 'Date',
          sortable: true,
          minWidth: '100px',
          selector: row => row.date
        },
      
       
        {
          name: 'Status',
          minWidth: '100px',
          sortable: row => row.status.title,
          cell: row => {
            return (
              <Badge color={status[row.status].color} pill>
                {status[row.status].title}
              </Badge>
            )
          }
        },
         
        {
            name: 'Customer',
            sortable: true,
            minWidth: '100px',
            selector: row => row.customer
          },
           
        {
            name: 'Email',
            sortable: true,
            minWidth: '200px',
            selector: row => row.email
          },
          {
            name: 'Country',
            sortable: true,
            minWidth: '100px',
            selector: row => row.country
          },
          {
            name: 'Shipping',
            sortable: true,
            minWidth: '100px',
            selector: row => row.shipping
          },
          {
            name: 'Source',
            sortable: true,
            minWidth: '100px',
            selector: row => row.source
          },
          {
            name: 'Order Type',
            sortable: true,
            minWidth: '100px',
            selector: row => row.orderType
          },
          {
            name: 'Actions',
            minWidth: '50px',
            allowOverflow: true,
            cell: (row) => {
                return (
                    <div className='d-flex'>
                        <Edit size={15} className='me-1' onClick={() => handleEdit(row)} />
                        <Trash size={15} className='me-1' onClick={() => handleDelete(row.id)} />
                    </div>
                )
            }
          }
          
        
      ]
     // Function to toggle the modal
     const handleModal = () => setModal(!modal)
 
     // Function to handle editing an order
     const handleEdit = (rowData) => {
         setIsEdit(true) 
         setEditData(rowData) 
         setModal(true) 
     }
 
  //for deleting any order
    const handleDelete = (rowId) => {
        setDeletingRowId(rowId); 
        setTimeout(() => {
            const newData = filteredData.filter(row => row.id !== rowId);
            setFilteredData(newData);
            setDeletingRowId(null); 
        }, 500); 
    };


  //  handlePerPage function to set rows per page based on user selection
  const handlePerPage = e => {
    const value = parseInt(e.target.value);
    setRowsPerPage(value);
    setCurrentPage(0); 
  };
  
  //handle status filter
    const handleStatusValue = e => {
      setStatusValue(e.target.value);
      handleFilter(); 
    };
    // handle category filter
    const handleCategoryChange = e => {
        setCategoryValue(e.target.value);
        handleFilter(); 
    };
    // ** Function to handle filter
    const handleFilter = () => {
        const searchLower = value.toLowerCase();
        const filteredItems = data.filter(item => {
         
          const idMatch = item.id.toString().toLowerCase().includes(searchLower);
          const shippifyMatch = item.shpiify.toLowerCase().includes(searchLower);
          const countryMatch = item.country.toLowerCase().includes(searchLower);
          const customerMatch = item.customer.toLowerCase().includes(searchLower);
          const emailMatch = item.email.toLowerCase().includes(searchLower);
          const statusMatch = item.status.toLowerCase().includes(searchLower);
          const orderTypeMatch = item.orderType.toLowerCase().includes(searchLower);
          const sourceMatch = item.source.toLowerCase().includes(searchLower);

    
          //for status and category filter
          const matchesStatus = statusValue === 'all' || item.status === statusValue;
          const matchesCategory = categoryValue === 'all' || item.orderType === categoryValue;
      

          return (idMatch || shippifyMatch || countryMatch || customerMatch || emailMatch||statusMatch||orderTypeMatch||sourceMatch) && matchesStatus && matchesCategory;
        });
      
        setFilteredData(filteredItems);
      };
      
    
  
    useEffect(() => {
        handleFilter();
      }, [value, statusValue, categoryValue]); 
      
    // ** Function to handle Pagination 
    const handlePagination = page => {
      setCurrentPage(page.selected);
    };
  

 
  const conditionalRowStyles = [
    {
      when: row => row.id === deletingRowId,
      style: {
        animation: 'fadeOut 0.5s forwards',
      },
    },
   
  ];
  
  
  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4' style={{fontWeight:"600"}}>Orders</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
                        <Button color='primary' onClick={() => { setIsEdit(false); setEditData(null); handleModal(); }}>
                            <span className='align-middle ms-50'>Create New</span>
                        </Button>
                    </div>
        </CardHeader>
        <CardBody>
            
          <Row className='mt-1 mb-50'>
          <Col lg='6'  md='6' sm='12' >
       
            <label htmlFor='search-order' style={{paddingLeft:"9px",paddingBottom:"5px", fontWeight:"600"}}>What are you looking for?</label>
            <Input
            id='search-order'
            className='ms-50 me-2 w-100'
            type='text'
            value={value}
            onChange={e => {
                setValue(e.target.value);
                handleFilter(); 
            }}
            placeholder='Search by ID, Shippify, Country, etc.'
            />

         
        </Col>
        <Col lg='3'  md='6' sm='12'>
        <label htmlFor='search-invoice ' style={{paddingLeft:"9px",paddingBottom:"5px", fontWeight:"600"}}>Status</label>
          <Input  className='ms-50 me-2 w-100' type='select' value={statusValue} onChange={handleStatusValue}>
            <option value='all'>All</option>
            <option value='Paid'>Paid</option>
            <option value='Pending'>Pending</option>
            <option value='Shipped'>Shipped</option>
            <option value='Refunded'>Refunded</option>
            <option value='Completed'>Completed</option>
           
          </Input>
         
          
          </Col>
          <Col lg='3' md='6' sm='12'>
        <label htmlFor='search-category' style={{ paddingLeft: "9px", paddingBottom: "5px", fontWeight: "600" }}>Category</label>
        <Input className='ms-50 me-2 w-100' type='select' value={categoryValue} onChange={handleCategoryChange}>
        
            <option value='all'>All</option>
            <option value='Regular'>Regular</option>
            <option value='Standard'>Standard</option>
            <option value='Bulk'>Bulk</option>
            <option value='Express'>Express</option>
            <option value='Custom'>Custom</option>
            <option value='Subscription'>Subscription</option>
            </Input>

          
          </Col>
         
          </Row>
        </CardBody>
    
       
        <div className='react-dataTable'>
        <DataTable
  key={rowsPerPage} 
  noHeader
  pagination ={false}
  selectableRows
  subHeader={true}
  columns={columns}
  paginationPerPage={rowsPerPage}
  className='react-dataTable'
  sortIcon={<ChevronDown size={10} />}

  paginationDefaultPage={currentPage + 1}
  selectableRowsComponent={BootstrapCheckbox}
  data={filteredData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)} 
  subHeaderComponent={
    <CustomHeader
    value={value}
    statusValue={statusValue}
    rowsPerPage={rowsPerPage}
    handleFilter={handleFilter}
    handlePerPage={handlePerPage}
    handleStatusValue={handleStatusValue}
    currentPage={currentPage}
    handlePagination={handlePagination}
    pageCount={Math.ceil(filteredData.length / rowsPerPage)}
  />
  
  
    
  }
  conditionalRowStyles={conditionalRowStyles}
/>

        </div>
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} isEdit={isEdit} editData={editData} />
    </Fragment>
  );
};
export default DataTableOfOrders
