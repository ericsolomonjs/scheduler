import React from "react";

import { queryByText, getByPlaceholderText, getAllByTestId, getByAltText, prettyDOM, getByText, render, cleanup, waitForElement, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";


afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"))

    fireEvent.click(getByText("Tuesday"))
    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    //wait for first load
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //3
    fireEvent.click(getByAltText(appointment, "Add"));
    //4
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    )
    expect(getByText(day, /no spots remaining/)).toBeInTheDocument();
  });

  {/*
  "loads data, cancels an interview and increases the spots remaining for Monday by 1"
  "loads data, edits an interview and keeps the spots remaining for Monday the same"
  "shows the save error when failing to save an appointment"
  "shows the delete error when failing to delete an existing appointment"
  */}

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    //wait for first load
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    //3
    fireEvent.click(getByAltText(appointment, "Delete"));
    //4
    expect(getByText(appointment, "Confirm")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "DELETING"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    )
    expect(getByText(day, /2 spots remaining/)).toBeInTheDocument();
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    )
    expect(getByText(day, /1 spot remaining/)).toBeInTheDocument();
  })
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Error"))
    expect(getByText(appointment, "Error")).toBeInTheDocument()
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Delete"));
   
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Error"))
    expect(getByText(appointment, "Error")).toBeInTheDocument()
  });

})
