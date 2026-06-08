# Elevate Horizon Connect

## Author

- Name: Rosa Maria De Caria
- Student ID: 881446865
- Course: Certificate IV in Programming
- Institution: TAFE NSW
- Year: 2026

## Tech Stack

Frontend (mobile app):
- React Native with Expo
- React Navigation (for moving between screens)
- React Native Paper (for the UI components)
- AsyncStorage (to save user preferences)
- expo-av (for playing sounds)

Backend (server):
- Node.js with Express
- Sequelize and SQLite (for the database)
- Swagger (to document the API)

Other tools:
- Visual Studio Code
- Git and GitHub
- Material Theme Builder

## What I have done so far

Navigation:
- Bottom tab navigation with Home, Events, and Settings tabs
- Stack navigation inside the Events tab (List, Details, Registration)

Home screen:
- Title and header
- Logo that plays a sound when tapped
- Welcome card

Events list screen:
- Shows all events from the API
- Search bar (only the design for now)
- Category filter chips (only the design for now)
- Shows an offline message when there is no internet

Event details screen:
- Shows all event information
- Register button (disabled when no spots are left)
- Shows a red warning banner when the event is full

Event registration screen:
- Form with name and email fields
- Checks the fields are filled in
- Shows a success message and goes back to the events list
- Updates the remaining spots after a registration

Settings screen:
- Light and dark theme toggle
- Sound on or off toggle
- Font size selector (Small, Medium, Large)
- Saves the settings so they stay after closing the app

Backend connection:
- Gets all the events from the API
- Gets a single event by its ID
- Sends a registration to the server
- Saves events locally for offline use

## What I still need to do

- Make the search bar actually filter the events
- Make the category chips actually filter the events
- Apply the selected font size to the text in the app
- Make the "View Today's Events" button work
- Add a "My Registrations" screen
- Final design check and testing