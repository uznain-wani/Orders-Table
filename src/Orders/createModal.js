import { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import { User, Mail, Calendar, Globe, Truck, List, X } from 'react-feather';
import { Modal, Input, Label, Button, ModalHeader, ModalBody, InputGroup, InputGroupText } from 'reactstrap';
import '@styles/react/libs/flatpickr/flatpickr.scss';

const AddNewModal = ({ open, handleModal, isEdit, editData }) => {
  const [picker, setPicker] = useState(new Date());
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [shippingMethod, setShippingMethod] = useState('');
  const [orderType, setOrderType] = useState('');

  useEffect(() => {
    if (isEdit && editData) {
      setCustomerName(editData.customer || ''); 
      setEmail(editData.email || '');
      setPicker(editData.date ? new Date(editData.date) : new Date());
      setCountry(editData.country || '');
      setShippingMethod(editData.shipping || ''); 
      setOrderType(editData.orderType || ''); 
    } else {
      setCustomerName('');
      setEmail('');
      setPicker(new Date());
      setCountry('');
      setShippingMethod('');
      setOrderType('');
    }
  }, [isEdit, editData]);

  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />;

  return (
    <Modal isOpen={open} toggle={handleModal} className='sidebar-sm' modalClassName='modal-slide-in' contentClassName='pt-0'>
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>{isEdit ? 'Edit Order' : 'New Order'}</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        {/* Customer Name */}
        <div className='mb-1'>
          <Label className='form-label' for='customer-name'>Customer Name</Label>
          <InputGroup>
            <InputGroupText><User size={15} /></InputGroupText>
            <Input id='customer-name' value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder='John Doe' />
          </InputGroup>
        </div>

        {/* Email */}
        <div className='mb-1'>
          <Label className='form-label' for='email'>Email</Label>
          <InputGroup>
            <InputGroupText><Mail size={15} /></InputGroupText>
            <Input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='johndoe@email.com' />
          </InputGroup>
        </div>

        {/* Order Date */}
        <div className='mb-1'>
          <Label className='form-label' for='order-date'>Order Date</Label>
          <InputGroup>
            <InputGroupText><Calendar size={15} /></InputGroupText>
            <Flatpickr className='form-control' id='order-date' value={picker} onChange={date => setPicker(date)} />
          </InputGroup>
        </div>

        {/* Country */}
        <div className='mb-1'>
          <Label className='form-label' for='country'>Country</Label>
          <InputGroup>
            <InputGroupText><Globe size={15} /></InputGroupText>
            <Input id='country' value={country} onChange={e => setCountry(e.target.value)} placeholder='USA' />
          </InputGroup>
        </div>

        {/* Shipping Method */}
        <div className='mb-1'>
          <Label className='form-label' for='shipping-method'>Shipping Method</Label>
          <InputGroup>
            <InputGroupText><Truck size={15} /></InputGroupText>
            <Input id='shipping-method' value={shippingMethod} onChange={e => setShippingMethod(e.target.value)} placeholder='FedEx' />
          </InputGroup>
        </div>

        {/* Order Type */}
        <div className='mb-1'>
          <Label className='form-label' for='order-type'>Order Type</Label>
          <InputGroup>
            <InputGroupText><List size={15} /></InputGroupText>
            <Input id='order-type' value={orderType} onChange={e => setOrderType(e.target.value)} placeholder='Express' />
          </InputGroup>
        </div>

        <Button className='me-1' color='primary' onClick={handleModal}>Submit</Button>
        <Button color='secondary' onClick={handleModal} outline>Cancel</Button>
      </ModalBody>
    </Modal>
  );
};

export default AddNewModal;
