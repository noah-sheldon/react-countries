# React Countries Web Application

This project is a single-page web application built with React that interacts with the REST Countries API. It allows users to view a list of countries, search for countries by name, language, or currency, mark countries as favorites, and view detailed information about each country.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Usage](#usage)
  - [Home Page](#home-page)
  - [Country Details](#country-details)
  - [Favorites](#favorites)
- [Bonus Features Implemented](#bonus-features-implemented)
- [Development Notes](#development-notes)
- [Contributions](#contributions)
- [License](#license)

## Installation

To run this project locally, follow these steps:

1. Clone the repository from GitHub:

   ```bash

   git clone https://github.com/noah-sheldon/react-countries.git

   ```

2. Change working directory:

   ```bash

   cd react-countries

   ```

3. Install required libraries:

   ```bash

   pnpm install

   ```

## Features

- Display a list of countries with their name, flag, population, languages, and currencies.
- Search functionality to find countries by name, language, or currency without reloading the page.
- View detailed information about each country without navigating to a separate page.
- Mark countries as favorites and view the list of favorite countries.
- Persist favorite countries using local storage for a seamless user experience.
- Error handling for API failures and invalid requests.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **REST Countries API**: Provides country-related information.
- **Ag-Grid**: Used for displaying and managing tabular data.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Deployment

The application is deployed and accessible at [React Countries Web Application](https://react-countries1.netlify.app/).

## Usage

### Home Page

Displays a searchable and sortable list of countries.

### Country Details

Click on a country to view detailed information such as capital, population, languages, and flag.

### Favorites

Mark countries as favorites using the checkbox in the grid. Favorite countries are persisted in local storage.

## Bonus Features Implemented

- Pagination for the list of countries to manage large datasets effectively.
- Sorting options for countries by name, population, or currency.
- Filtering countries based on language or currency.
- Styled Ag-Grid for enhanced visual appeal and usability.

## Development Notes

- Ensure a stable internet connection to fetch data from the REST Countries API.
- Test different search queries and edge cases to ensure robust functionality.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
