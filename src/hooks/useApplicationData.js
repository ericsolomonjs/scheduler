import { useState, useEffect } from "react";
import Axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
//refactor useapplicationdata!!!!
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers/")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const daysAppointments = [];

    for (let day of state.days) {
      if (day.name === state.day) {
        day.appointments.forEach(element => {
          daysAppointments.push(appointments[element]);
        });
      }
    }

    const numSpots = countSpots(daysAppointments);
    const tempDays = [...state.days];
    for (let i = 0 ; i < tempDays.length; i++) {
      if (tempDays[i].name === state.day) {
        tempDays[i].spots = numSpots;
      }
    }
    return Axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: [...tempDays] });
      })

  }
  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const daysAppointments = [];

    for (let day of state.days) {
      if (day.name === state.day) {
        day.appointments.forEach(element => {
          daysAppointments.push(appointments[element]);
        });
      }
    }

    const numSpots = countSpots(daysAppointments);
    const tempDays = [...state.days];
    for (let i = 0 ; i < tempDays.length; i++) {
      if (tempDays[i].name === state.day) {
        tempDays[i].spots = numSpots;
      }
    }

    return Axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days: [...tempDays] });
      })
  }

  function countSpots(appointments) {
    let counter = 0;
    console.log("appointments: ", appointments);
    console.log("state: ", state);
    for (let appointment of appointments) {
      if (!appointment.interview) { counter++; }

    }
    return counter;
  }

  return { state, setDay, bookInterview, cancelInterview }
}