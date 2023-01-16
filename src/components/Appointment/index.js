import React from 'react';
import './styles.scss';
import Header from 'components/Appointment/Header.js'
import Show from 'components/Appointment/Show.js'
import Empty from 'components/Appointment/Empty.js'
import Status from './Status';
import { useVisualMode } from "../../hooks/useVisualMode.js";
import Form from './Form';
import Confirm from './Confirm';



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW));
  }

  function cancelInterview(id) {
    transition(DELETING);

    props.deleteInterview(id)
    .then(() => transition(EMPTY))
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {
        transition(CREATE);
      }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onConfirm={() => transition(CONFIRM)}
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
        <Status />
      )}
      {mode === DELETING && (
        <Status message="DELETING"/>
      )}
      {mode === CONFIRM && (
        <Confirm
        onCancel={() => back()}
        onDelete={() => cancelInterview(props.id)}/>
      )}
    </article>
  )
}