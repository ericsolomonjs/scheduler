# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Visual Testbed

```sh
npm run cypress
```

## Creating an Appointment

  - Click on the + icon in an empty appointment slot

  - Enter the students name

  - Select an interviewer by clicking on their picture

  - Click the Save button

  - The appointment will be created after being successfully submitted to the backend server to be stored in the database using an Axios request (PUT)

## Deleting an Appointment

 - Click on the trash icon in an occupied appointment slot

 - Click the Confirm button if you are sure you want to delete the appointment

 - The appointment will be deleted after being successfully submitted to the backend server to be deleted from the database using an Axios request (DELETE)


## Editing an Appointment

  - Click on the edit icon in an occupied appointment slot

  - Edit the students name

  - Select an interviewer by clicking on their picture

  - Click the Save button

  - The appointment will be altered after being successfully submitted to the backend server to be stored in the database using an Axios request (PUT)
