//getAppointmentsForDay fn
export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const appointmentsArray = [];
  for (let dayObj of state.days) {
    if (dayObj.name === day) {

      dayObj.appointments.map((element) => {
        for (let key in state.appointments) {
          if (element === state.appointments[key].id) {
            appointmentsArray.push(state.appointments[key]);
          }
        }
        return null;
      })
    }
  }
  return appointmentsArray;
}

export function getInterview(state, interview) {
  //returns interview data when passed an object that contains an interviewer
  if (interview && interview.interviewer) {
    //create interviewerdata object
    const interviewObj = { student: interview.student, interviewer: state.interviewers[interview.interviewer] };
    return interviewObj
  }
  //return null if doesn't satisfy earlier condition
  return null;
}

export function getInterviewersForDay (state, day) {
  const interviewersArr = [];
  for (let dayObj of state.days) {
    if (dayObj.name === day) {

      dayObj.interviewers.map((element) => {
        for (let key in state.interviewers) {
          if (element === state.interviewers[key].id) {
            interviewersArr.push(state.interviewers[key]);
          }
        }
        return null;
      })
    }
  }
  return interviewersArr;
}