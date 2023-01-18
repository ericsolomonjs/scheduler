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
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE  = "ERROR_SAVE ";

  const { mode, transition, back } = useVisualMode(
  (props.interview ? SHOW : EMPTY)
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING,true);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log(error);
        transition(ERROR_SAVE,true);
      })
  }

  function cancelInterview(id) {
    transition(DELETING,true);
    props.deleteInterview(id)
    .then(() => transition(EMPTY))
    .catch((error) => {
      console.log(error);
      transition(ERROR_DELETE,true);
  })
  }
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
          onCancel={() => back()}
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
        onCancel={() => back()}
        onDelete={() => cancelInterview(props.id)}/>
      )}
      {mode === EDIT && (
        <Form
        key={props.id}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Error deleting"
        onClose={() => back()}/>
      )}
      {mode === ERROR_SAVE && (
        <Error message="Error saving"
        onClose={() => back()}/>
      )}
    </article>
  )
}