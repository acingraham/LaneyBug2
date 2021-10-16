# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Adding files workflow
- Run `pip3 install --user TikTokApi` # Just needs to be done first time setting up. Figure out how to automate this.
- Run `python -m playwright install` # Just needs to be done first time setting up. Figure out how to automate this.
- `python3 scrape.py`
- `ls.js` # Appends filenames in the videos directory into the videoList.json file and removes any duplicates

## Roadmap
### Next
- Script to check what videos are not in s3 and then upload them
- Show different pages for /, /skip, /other, and /admin
- Set up lambda to add new tiktoks at a regular interval
- Curate more videos
- Automatically move liked tiktoks to project
- Add history functions
- Only show videos not previously seen
- Add code pipeline so changes pushed to github automatically get propagated to site

- Move to AWS
- Add favorites ability
- Figure out broken videos. One example is 6982697321247018245.mp4
- Make it mobile friendly
- Log videos that have errored
- Favicon, title, and anything else from the existing site
- Finish curating videos
- Add documentation of the different processes and utility functions
- Optimize storage costs
- Be able to review new tiktoks without running anything locally
- Record watched videos. Start w/ localstorage / cookies.
- In full-screen, clicking arrows breaks things by moving to next video without exiting full screen
- Implement wrap-around scroll
- Fix/Add tests
- Handle case when user clicks arrows while video is maximized

### Optional
- Make sure arrows always work. I think it's a focus issue.
- Make background related to video being shown
- Make tabs easier to see and select
- Get rid of unnecessary app folder
- Avoid having to prefix json requests w/ LaneyBug2
- Turn into an app?

### Complete
- Make request from browser
- Save video urls to file
- Fix CSS horizontal scroll
- Allow arrows to control
- Make sure video plays on initial load (opted to add controls instead)
- Curate videos
- Get rid of X of 10 label
- Fix echo
- Handle errors


