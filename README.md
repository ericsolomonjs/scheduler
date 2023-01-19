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

![alt text](https://github.com/facelessagony/scheduler/blob/master/screenshots/Scheduler-1.jpg)

- Enter the students name

![alt text](https://github.com/facelessagony/scheduler/blob/master/screenshots/Scheduler-2.jpg)

- Select an interviewer by clicking on their picture

![alt text](https://github.com/facelessagony/scheduler/blob/master/screenshots/Scheduler-3.jpg)

- Click the Save button

- The appointment will be created after being successfully submitted to the backend server to be stored in the database using an Axios request (PUT)

![alt text](https://github.com/facelessagony/scheduler/blob/master/screenshots/Scheduler-4.jpg)

## Deleting an Appointment

- Hover over the appointment you wish to edit

![alt text](https://github.com/facelessagony/scheduler/blob/master/screenshots/Scheduler-6.jpg)

- Click on the trash icon in an occupied appointment slot

- Click the Confirm button if you are sure you want to delete the appointment

- The appointment will be deleted after being successfully submitted to the backend server to be deleted from the database using an Axios request (DELETE)

![alt text](https://github.com/facelessagony/scheduler/blob/master/screenshots/Scheduler-7.jpg)

## Editing an Appointment

- Hover over the appointment you wish to edit

![alt text](https://github.com/facelessagony/scheduler/blob/master/screenshots/Scheduler-6.jpg)

- Click on the edit icon in an occupied appointment slot

- Edit the students name

![alt text](https://github.com/facelessagony/scheduler/blob/master/screenshots/Scheduler-2.jpg)

- Select an interviewer by clicking on their picture

- Click the Save button

- The appointment will be altered after being successfully submitted to the backend server to be stored in the database using an Axios request (PUT)

![alt text](https://github.com/facelessagony/scheduler/blob/master/screenshots/Scheduler-4.jpg)
