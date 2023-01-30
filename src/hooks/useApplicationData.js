import { useState, useEffect } from "react";
import Axios from "axios";

export default function useApplicationData() {
  //initialize states
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = day => setState({ ...state, day });

  //initializes data from API server
  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  //function to delete an interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const tempDays = getSpots(state.days, appointments);

    //returns promise. if promise resolves then sets state with callback
    return Axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days: [...tempDays] });
      })

  }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const tempDays = getSpots(state.days, appointments);
    
    //returns promise. if promise resolves then sets state with callback
    return Axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days: [...tempDays] });
      })
  }

  function getSpots(stateDays, appointments) {
    const daysAppointments = [];

    //creates days appointments array
    for (let day of stateDays) {
      if (day.name === state.day) {
        day.appointments.forEach(element => {
          daysAppointments.push(appointments[element]);
        });
      }
    }

    //counts spots using daysAppointments array
    const numSpots = countSpots(daysAppointments);

    //create tempDays array and process the spots
    const tempDays = [...stateDays];
    for (let i = 0; i < tempDays.length; i++) {
      if (tempDays[i].name === state.day) {
        tempDays[i].spots = numSpots;
      }
    }
    //return the new array 
    return tempDays;
  }

  //simple counter function returns count of the appointments
  function countSpots(appointments) {
    let counter = 0;
    for (let appointment of appointments) {
      if (!appointment.interview) { counter++; }
    }
    return counter;
  }

  return { state, setDay, bookInterview, cancelInterview }
}