# Ticketing Notes Frontend.

This project is deployed at [ticketingNotes](https://ticketingnotes.onrender.com).

Welcome to the frontend repository of the Chun L. Ticketing App! This app is designed to streamline job management for repair shops by providing a comprehensive ticketing system. With this app, repair shop owners and employees can easily issue, track, and manage tickets for every job, ensuring efficient workflow and organization.

## Features
- **Private Access:** The app is accessible only by workers of the organization.
- **Ticket Management:**
  - All employees can open tickets.
  - Employees can only close the tickets they open.
  - Employees can only see the tickets they open.
- **Notes Management:**
  - Notes have a ticket number, title, note body, created date, and updated date.
  - Notes can be either OPEN or COMPLETED.
  - Anyone can create a note (when a customer checks in).
  - Employees can only view and edit their assigned notes.
  - Managers and Admins can view, edit, and delete all notes.
  - Notes can only be deleted by Managers or Admins.
- **User Roles:**
  - Users can be Employees, Managers, or Admins.
  - Only Managers and Admins can access User Settings.
  - Only Managers and Admins can create new users.
- **Accessibility:**
  - Available in desktop mode, with support for mobile devices.
    
## Getting Started

1. **Installation:** Clone the repository to your local machine.

   ```bash
   git clone https://github.com/Okunola11/ticketingNotes
   
2. **Dependencies:** Install the required dependencies using npm or yarn.
   ```bash
   npm install
   ```
    Or
   ```bash
   yarn install
   ```
3. **Run the App:** Start the development server.
   ```bash
   npm start
   ```
    Or
   ```bash
   yarn start
   ```
4. **Access:** Access the app via your web browser at http://localhost:3000.

## Conclusion and Learning

Throughout the development of this project, I have gained valuable insights and experience in various aspects of software development. Some of the key learnings include:

- **Redux Toolkit and RTK Query:** I extensively used Redux Toolkit and RTK Query for state management and data fetching, learning their best practices and optimizations.
  
- **Workflow Between Backend and Frontend:** I deepened my understanding of the workflow between backend and frontend development, ensuring seamless integration and data communication.

- **Backend API Development:** I successfully created the backend API for this project, gaining hands-on experience in designing and implementing RESTful APIs.

These experiences have not only enhanced my technical skills but also equipped me with practical knowledge applicable to real-world projects. I look forward to applying these learnings in future endeavors and continuing to grow as a software developer.

## Contributing

Contributions to the Repair Shop Ticketing App are welcome! 

## Acknowledgements

Special thanks to [Dave Gray](https://github.com/gitdagray) who have helped make this project possible.

---
© 2024 Chun L. Ticketing App. All Rights Reserved.

 
