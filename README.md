This project is a simple crypto currency dashboard to keep track of crypto currencies and see statistics for the present and past data.
Developed using react 'create-react-app', styled using styled-components 

Some features and pages <br>
<strong>Settings Page</strong>
<ul>
 <li>Providing a default coins as favorites & a complete list of all coins</li>
 <li>Searching for coins with fuzzy search</li>
 <li>Adding/Removing coins on the list of favorites</li>
</ul>
<strong>Dashboard Page</strong>
<ul>
 <li>Data initializes from remembered favorites, or forwards to Settings page</li>
 <li>Displays major Cards for first favorites and compact Cards for next </li>
 <li>Adding/Removing coins on the list of favorites</li>
 <li>Renders a line chart for the 10 historical points on current favorite symbol</li>
 <li>Select coins changes and re-fetch data, remembers current favorite</li>
 <li>Select to render historical points on Date: Days Weeks Months</li>
</ul>

Other:
allow user to change the background (light theme/ dark theme)


## Available Scripts

## `npm install`
Install all the dependencies

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
