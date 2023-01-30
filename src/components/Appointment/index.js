import React from 'react';
import './styles.scss';
import Header from 'components/Appointment/Header.js'
import Show from 'components/Appointment/Show.js'
import Empty from 'components/Appointment/Empty.js'
import Status from './Status';
import { useVisualMode } from "../../hooks/useVisualMode.js";
import Form from './Form';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  //Define visual mode constants
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE  = "ERROR_SAVE ";
  const ERROR_EDIT = "ERROR_EDIT";

  //destructure use visual mode fn to use mode, transition, back fns
  const { mode, transition, back } = useVisualMode(
  (props.interview ? SHOW : EMPTY)
  );
  
  //function called when saving NEW appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log(error);
        transition(ERROR_SAVE,true);
      })
  }

  //called when editing an appointment
  function saveEdit(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log(error);
        transition(ERROR_EDIT,true);
      })
  }

  //called when cancelling a booked interview
  function cancelInterview(id) {
    transition(DELETING,true);
    props.deleteInterview(id)
    .then(() => transition(EMPTY))
    .catch((error) => {
      console.log(error);
      transition(ERROR_DELETE,true);
  })
  }
  //return appointment component
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {
        transition(CREATE);
      }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onConfirm={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />)}
      {mode === CREATE && (
        <Form
          key={props.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status data-testid="Saving" message="Saving"/>
      )}
      {mode === DELETING && (
        <Status message="DELETING"/>
      )}
      {mode === CONFIRM && (
        <Confirm
        onCancel={back}
        onDelete={() => cancelInterview(props.id)}/>
      )}
      {mode === EDIT && (
        <Form
        key={props.id}
        student={(props.interview.student ? props.interview.student : "")}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={saveEdit}
      />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Error deleting"
        onClose={back}/>
      )}
      {mode === ERROR_SAVE && (
        <Error message="Error saving"
        onClose={back}/>
      )}
      {mode === ERROR_EDIT && (
        <Error message="Error Editing"
        onClose={back}/>
      )}
    </article>
  )
}