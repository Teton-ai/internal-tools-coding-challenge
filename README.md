# Web App Developer Intern - Coding Challenge 🤓

Hello there! 👋 Welcome to the coding challenge for the Web App Developer Intern position at [**Teton.ai**](https://teton.ai/). We're excited to see what you can do!

**Please read the instructions below carefully**. If you have any questions, please reach out to us at [**roland@teton.ai**](mailto:roland@teton.ai).

## Introduction

As you may remember from the interview, we deploy our devices in hospitals and care homes. We want to make sure that our devices are always working properly, so we need to monitor them. We started building a web app that allows us to monitor the devices, but we need your help to finish it!

Your task is to finish the provided web app. The web-app already has a backend + some useful frontend helpers & components. The app is built with [**React**](https://reactjs.org/) and [**Next.js**](https://nextjs.org/).

The finished app should roughly speaking:

- Visualize the system's detected activity for every device / patient
- Allow you to rate the system's performance for every device
- Visualize average scores & other aggregate stats

We'll be evaluating your submission based on the following criteria:

- **Functionality**: Does the app work as expected? Does it meet the requirements?
- **Code quality**: Is the code well-structured and easy to understand?
- **Creativity/aesthetics**: Is the app visually appealing and easy to use?

## Pre-requisites

You should have [**Node.js**](https://nodejs.org/en/) installed on your computer. You should be able to build and run this app locally on your machine out of the box. Normally we'd use the following set of commands to do this:

```bash
npm install
npm run dev
```

You should be able to see that the app is running at [**http://localhost:8080**](http://localhost:8080/). It's just a blank page.

## Challenge 🦾

Below you'll find a list of the requirements for the review page. However, we intentionally leave out any design related requirements, because we'd like to see how you approach the design on your own (make it look appealing and intuitive to use).

Here's a breakdown of the tasks you need to complete:

1. **Set up the base app**. First, you should fork this repository and make sure that you're able to build the base app locally. You should be able to see the app running at [**http://localhost:8080**](http://localhost:8080/).
1. **Implement a header for the name of the hospital**. On the review page you should display the name of the hospital. Make up a name or just call it *"St. Mary's Hospital"* if you want. 
1. **Display the devices**. When the user is reviewing a location, they should be able to see a collection of all the devices that belong to the selected hospital. Each device element should have the following information displayed so that the user can add their reviews:
    - **Device name**: The serial number of the device. You can read this out from each `patient_event` from the `"serial_number"` field.
    - **Device score**: The review of the perfomance of the system represented as a number between 1 and 5. The user should be able to interact and set the scores for each of these. There are 4 different aspect of the system that the user should be able to set separately:
      - **General score**: The overall performance of the system.
      - **BedNet score**: The performance of the BedNet system (it's not important what the BedNet system actually is).
      - **FallNet score**: The performance of the FallNet system (it's not important what the FallNet system actually is).
      - **Logic score**: The performance of the logic system.
   - **Emoji representation of the average score**: See below for the 4 different scores that the user can give to a device. Based on the average value of the scores for the device, you should display an emoji that represents the average score. For example, if the average score is 3, you should display the 😐 emoji. (Here's a list of emojis that you can use: 😖, 😞, 😐, 🙂, 🥳)
    - **A timeline of the night**: Our system detects different state that the monitored patient can be in (e.g. `laying_in_bed` or `sitting_in_chair`). You should display a visualization of the night for the device under the device's name. The visualization should show the different states that the patient was in during the night using colors to differentiate between the states. For this, you should use the component `PatientEventTimeline` that we provided in the base app in `pages/index.tsx`. You can find the state of the patient in each `patient_event` from the `"type"` field.

    - **Review notes**: A text field where the user can add notes about the review for this device.
    - **Submit button**: A button that the user can click to submit their review for the device. When it's clicked, the statistics should be automatically updated to reflect the new review. We've made the `/api/post/bedReview` endpoint, which you can use to save this review.
1. **Display statistics about the review**. When the user is reviewing a location, they should be able to see some statistics about the review. The statistics should include the following:
   - **Number of devices**: The total number of devices that are being reviewed.
   - **Number of devices already reviewed**: The number of devices that have already been reviewed. Each device has a unique ID, which you can read out from each `patient_event` from the `"bed"` field.
   - **Average score**: The average value of the **general scores** (see below) for all devices. (For example, if a device has a score of 3, and another device has a score of 5, the average score is 4.)

## The sample data

The sample data is provided in the `data.json` file. There are 3 different arrays in the file:

- `"patient_events"`: This array contains all the things the patient did during the night. Each event has the following fields:
  - `"id"`: The unique ID of the event.
  - `"bed"`: The ID of the device that the event belongs to.
  - `"serial_number"`: The serial number of the device that the event belongs to.
  - `"department"`: The ID of the department that the device is located in.
  - `"type"`: The type of the event. This is the new activity the patient started doing.
  - `"timestamp"`: The timestamp of when the patient changed activity type.
- `"bed_reviews"`: This array contains all the reviews that have been submitted for the devices. Each review has the following fields:
  - `"id"`: The unique ID of the review.
  - `"bed"`: The ID of the device that the review belongs to.
  - `"date"`: The date of the review (format is: "YYYY-MM-DD").
  - `"review_username"`: The username of the user that submitted the review.
  - `"general_value"`: The general score of the device.
  - `"bednet"`: The BedNet score of the device.
  - `"fallnet"`: The FallNet score of the device.
  - `"logic"`: The logic score of the device.
  - `"notes"`: The notes of the review.
  - `"modified_on"`: The timestamp of when the review was last submitted.
  - `"created_on"`: The timestamp of when the review was originally created.
  - `"department"`: The ID of the department that the device is located in.
- `"meta"`: This array contains the metadata for the devices. Each device has the following fields:
  - `"from"`: The timestamp of the start of the night.
  - `"to"`: The timestamp of the end of the night.

We've provided you with a `helpers/types.ts` file that contains the types that you'll need to work with. You can find the types for the data in the `data.json` file in the `ReviewDataType` type.

We also have already implemented the APIs for reading and writing the `data.json` file. You can find the code for the APIs in the `pages/api/` folder.

## Submission 📦

When you're done, please send us a link to your GitHub fork of this repository. We'll review your code and get back to you as soon as possible.
