# Comic Book Rental System

This is a web-based Comic Book Rental System that allows users to manage comic book rentals. The system is divided into two parts:

1. **Backend (API)**: Built with ASP.NET Core and Entity Framework, providing RESTful APIs for managing comic books, customers, rentals, and rental reports.
2. **Frontend**: Built with React, Ant Design for UI components, and Axios for API communication.

## Table of Contents
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [How to Use](#how-to-use)
- [License](#license)

---

## Backend Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/mtuanvu/comic_books.git
   
Navigate to the ComicSystem folder:
cd ComicSystem

Install the necessary packages via NuGet or using the CLI:
dotnet restore


Configure your database connection in appsettings.json:
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;database=comicsystem;user=root;password=yourpassword"
}

Run the application:
dotnet run

The backend API will now be running on http://localhost:5179.

Frontend Setup
Navigate to the frontend directory:
cd frontend


Install the required dependencies:
npm install


To start the development server:
npm start

The frontend will now be available at http://localhost:3000.

API Endpoints
1. Comic Books
GET /api/comic-books/all
Fetches all comic books.

POST /api/comic-books/add
Adds a new comic book.

PUT /api/comic-books/update/{id}
Updates an existing comic book by ID.

DELETE /api/comic-books/delete/{id}
Deletes a comic book by ID.

2. Customers
POST /api/customers/register
Registers a new customer.
3. Rentals
POST /api/rentals/rental/books
Rent comic books for a customer.

GET /api/rentals/report
Fetches a rental report within a specified date range.

4. Rental Report
GET /api/rentals/report?startDate={startDate}&endDate={endDate}
Retrieves rental report data for the given date range.

Project Structure

Backend (ComicSystem)
Controllers: Contains API endpoints for comic books, customers, rentals, and rental reports.
Models: Contains the data models such as Customer, ComicBook, Rental, and RentalDetail.
Database Context: The ComicSystemContext class handles database interaction using Entity Framework.
Migrations: Used for managing database schema changes.

Frontend (frontend)
Components:
ComicBooksList: Displays a list of all comic books with options to update or delete them.
ComicBookForm: A form for creating or updating comic books.
CustomerForm: A form for registering a new customer.
RentBooksForm: A form to allow customers to rent books.
RentalReport: Displays rental report data based on the date range selected.
Services: Contains the API communication logic using axios.
App.js: The main React component where routing and rendering of different pages happens.

Technologies Used
Backend:
ASP.NET Core 6.0
Entity Framework Core
MySQL

Frontend:
React.js
Ant Design (for UI components)
Axios (for making HTTP requests)
Moment.js (for date formatting)
React Router (for routing)

How to Use
Backend:
Ensure the backend API is running at http://localhost:5179 and has access to the MySQL database with the correct connection settings.

Frontend:
Start the frontend using npm start and ensure it communicates with the backend API at http://localhost:5179.


Interacting with the System:
Register a customer through the Customer form.
Add comic books using the Add Comic Book form.
Rent comic books by filling out the Rent Books form.
View rental reports using the Rental Report component by selecting a date range.
