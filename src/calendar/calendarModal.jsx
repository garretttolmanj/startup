import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export function CalendarModal(props) {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [showRemoveButtons, setShowRemoveButtons] = useState([]);

  useEffect(() => {
    if (props.show && props.currentUser && props.currentUser.calendar && props.currentUser.calendar[props.selectedDay]) {
      const calendarData = props.currentUser.calendar[props.selectedDay];
      const formattedWorkouts = [];

      for (let i = 0; i < calendarData.length; i += 4) {
        const exercise = calendarData[i];
        const sets = calendarData[i + 1];
        const reps = calendarData[i + 2];
        const setData = calendarData[i + 3];

        formattedWorkouts.push([exercise, sets, reps, setData]);
      }

      setWorkouts(formattedWorkouts);
      setShowRemoveButtons(new Array(formattedWorkouts.length).fill(false));
    } else {
      // Clear workouts state when modal is closed
      setWorkouts([]);
      setExercise('');
      setSets('');
      setReps('');
      setShowRemoveButtons([]);
    }
  }, [props.show, props.currentUser, props.selectedDay]);

  const handleModalClose = () => {
    // Call the onHide prop to close the modal
    props.onHide();
  };
  

  const toggleRemoveButton = (index) => {
    setShowRemoveButtons(prevButtons => {
      const newButtons = [...prevButtons];
      newButtons[index] = !newButtons[index];
      return newButtons;
    });
  };

  const handleRemoveClick = (index) => {
    props.currentUser.calendar[props.selectedDay].splice(index, index+4);
    props.currentUser.save();
    const updatedWorkouts = [...workouts];
    updatedWorkouts.splice(index, 1);
    setWorkouts(updatedWorkouts);
    setShowRemoveButtons(prevButtons => {
      const newButtons = [...prevButtons];
      newButtons.splice(index, 1);
      return newButtons;
    });
  };

  const handleWeightChange = (workoutIndex, setIndex, newValue) => {
    // save the changes to the user
    if (!props.currentUser.calendar[props.selectedDay][workoutIndex + 3][setIndex]){
      props.currentUser.calendar[props.selectedDay][workoutIndex + 3].push({weight: newValue});
      props.currentUser.save();
    } else {
      props.currentUser.calendar[props.selectedDay][workoutIndex + 3][setIndex].weight = newValue;
      props.currentUser.save();
    }
    
    // update the workouts state
    const updatedWorkouts = [...workouts];
    console.log(workoutIndex);
    console.log(updatedWorkouts)
    if (!updatedWorkouts[workoutIndex][3][setIndex]) {
      updatedWorkouts[workoutIndex][3].push({weight: newValue});
      setWorkouts(updatedWorkouts);
    } else {
      updatedWorkouts[workoutIndex][3][setIndex].weight = newValue;
      setWorkouts(updatedWorkouts);
    }
  };
  
  const handleRepsChange = (workoutIndex, setIndex, newValue) => {
        // save the changes to the user
        if (!props.currentUser.calendar[props.selectedDay][workoutIndex + 3][setIndex]){
          props.currentUser.calendar[props.selectedDay][workoutIndex + 3].push({completedReps: newValue});
          props.currentUser.save();
        } else {
          props.currentUser.calendar[props.selectedDay][workoutIndex + 3][setIndex].completedReps = newValue;
          props.currentUser.save();
        }
        // update the workouts state
        const updatedWorkouts = [...workouts];

        if (!updatedWorkouts[workoutIndex][3][setIndex]) {
          updatedWorkouts[workoutIndex][3].push({completedReps: newValue});
          setWorkouts(updatedWorkouts);
        } else {
          updatedWorkouts[workoutIndex][3][setIndex].completedReps = newValue;
          setWorkouts(updatedWorkouts);
        }
  };
  

  const addWorkout = () => {
    if (!exercise || isNaN(parseInt(sets)) || isNaN(parseInt(reps)) || parseInt(sets) < 1 || parseInt(reps) < 1) {
      alert('Please fill out all fields with valid values.');
      return;
    }

    props.currentUser.addWorkout(props.selectedDay, exercise, Number(sets), Number(reps), []);
    const newWorkout = [exercise, Number(sets), Number(reps), []];
    console.log(newWorkout);
    setWorkouts([...workouts, newWorkout]);
    setShowRemoveButtons([...showRemoveButtons, false]);
    setExercise('');
    setSets('');
    setReps('');
  };

  const renderWorkouts = () => {
    if (workouts.length === 0) {
      return null;
    }
  
    return workouts.map((workout, i) => {
      const exercise = workout[0];
      const sets = workout[1];
      const reps = workout[2];
      const setData = workout[3];
      const showRemoveButton = showRemoveButtons[i];
      
      return (
        <div key={i}>
          <h3 className='exercise' onClick={() => toggleRemoveButton(i)}>
            {exercise} {sets} Sets {reps} Reps
            {showRemoveButton && (
              <Button variant="danger" size="sm" className="remove-btn" onClick={() => handleRemoveClick(i)}>Remove</Button>
            )}
          </h3>
          <table>
            <tbody>
              <tr>
                <td><label>Weight</label></td>
                {[...Array(sets)].map((_, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      value={setData[index] ? setData[index].weight : ''}
                      onChange={(e) => handleWeightChange(i, index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.target.blur(); // Blur the input field
                        }
                      }}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td><label>Reps</label></td>
                {[...Array(sets)].map((_, index) => (
                  <td key={index}>
                    <input
                      type="text"
                      value={setData[index] ? setData[index].completedReps : ''}
                      onChange={(e) => handleRepsChange(i, index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.target.blur(); // Blur the input field
                        }
                      }}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      );
      
      
    });
  };  
  

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={props.show}
      onHide={handleModalClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.selectedDay}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderWorkouts()}
      </Modal.Body>
      <Modal.Footer>
        <InputGroup className='mb-3 inputExercise'>
          <InputGroup.Text>Exercise</InputGroup.Text>
          <Form.Select value={exercise} onChange={(e) => setExercise(e.target.value)} aria-label='Select Exercise'>
            <option>Select Exercise</option>
            {props.currentUser && props.currentUser.exercise_list.map((exercise, index) => (
              <option key={index} value={exercise}>
                {exercise}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
        <InputGroup className='mb-3 inputSet'>
          <InputGroup.Text>Sets</InputGroup.Text>
          <Form.Control value={sets} onChange={(e) => setSets(e.target.value)} type='number' min='1' />
          <InputGroup.Text>Reps</InputGroup.Text>
          <Form.Control value={reps} onChange={(e) => setReps(e.target.value)} type='number' min='1' />
          <Button variant='outline-secondary' id='button-addon1' onClick={addWorkout}>
            Add
          </Button>
        </InputGroup>
      </Modal.Footer>
    </Modal>
  );
}
