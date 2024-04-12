import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function CalendarModal(props) {
  const renderDay = (day, currentUser) => (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      show={props.show} // Ensure that the modal visibility is controlled by the parent component
      onHide={props.onHide} // Pass onHide function to handle modal close
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {day}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Body
      </Modal.Body>
      <Modal.Footer>
        <div className='addWorkout'>
          <InputGroup className='mb-3 inputExercise'>
            <InputGroup.Text>Exercise</InputGroup.Text>
            <Form.Select aria-label='Select Exercise'>
              <option>Select Exercise</option>
              <option value='1'>One</option>
              <option value='2'>Two</option>
              <option value='3'>Three</option>
            </Form.Select>
          </InputGroup>
          <InputGroup className='mb-3 inputSet'>
            <InputGroup.Text>Sets</InputGroup.Text>
            <Form.Control type='number' min='1' />
            <InputGroup.Text>Reps</InputGroup.Text>
            <Form.Control type='number' min='1' />
            <Button variant='outline-secondary' id='button-addon1'>
              Add
            </Button>
          </InputGroup>
        </div>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      {renderDay(props.selectedDay, props.currentUser)}
    </>
  );
}
