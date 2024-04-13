import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { User } from '../calendar/user';

export function Exercises(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState('');
  const [showAddInput, setShowAddInput] = useState(false);
  const [showRemoveButtons, setShowRemoveButtons] = useState(Array.from({ length: 0 }, () => false));

  useEffect(() => {
    async function getUserAndSetUserName(username) {
      const user = await User.load(username);
      setCurrentUser(user);
    }

    getUserAndSetUserName(props.userName);
  }, [props.userName]);

  useEffect(() => {
    if (props.show && currentUser) {
      const currentExercises = currentUser.exercise_list;
      setExercises(currentExercises);
      setShowRemoveButtons(Array.from({ length: currentExercises.length }, () => false)); // Initialize remove buttons visibility state
    } else {
      setExercises([]);
      setShowRemoveButtons([]);
    }
  }, [props.show, currentUser]);

  const handleAddClick = async () => {
    if (newExercise.trim() !== '') {
      if (currentUser.exercise_list.includes(newExercise)) {
        return;
      }
      await setExercises(prevExercises => [...prevExercises, newExercise]);
      currentUser.addExercise(newExercise);
      setNewExercise('');
      setShowAddInput(false);
      setShowRemoveButtons([...showRemoveButtons, false]); // Add false for the new exercise
    }
  };
  
  

  const handleRemoveClick = (index, exercise) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
    setShowRemoveButtons(prevButtons => {
      const updatedButtons = [...prevButtons];
      updatedButtons.splice(index, 1);
      return updatedButtons;
    });
    currentUser.removeExercise(exercise);
  };

  const toggleRemoveButton = (index) => {
    setShowRemoveButtons(prevButtons => {
      const updatedButtons = [...prevButtons];
      updatedButtons[index] = !updatedButtons[index];
      return updatedButtons;
    });
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.userName}'s Exercise List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {exercises.map((exercise, index) => (
            <li key={index} onClick={() => toggleRemoveButton(index)}>
              {exercise}
              {showRemoveButtons[index] && (
                <Button
                  variant="danger"
                  size="sm"
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent li click event from firing
                    handleRemoveClick(index, exercise);
                  }}
                >
                  Remove
                </Button>
              )}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        {!showAddInput && (
          <Button variant="primary" onClick={() => setShowAddInput(true)}>
            Add Exercise
          </Button>
        )}
        {showAddInput && (
          <InputGroup>
            <Form.Control
              placeholder="New Exercise"
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddClick();
                }
              }}
            />
            <Button variant="outline-secondary" onClick={handleAddClick}>
              Add
            </Button>
          </InputGroup>
        )}
      </Modal.Footer>
    </Modal>
  );
}