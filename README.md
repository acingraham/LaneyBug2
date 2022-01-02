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

### Deploying to gh-pages
- Run `npm run deploy`
- Note that you'll likely need to run an invalidation in the CloudFront console for changes to propagate

## Architecture
### DynamoDB Entities
|           | PK                | SK                           |
|-----------|-------------------|------------------------------|
| Group     | GROUP#<groupname> | VIDEO#<s3objectname>         |
| History   | USER#<username>   | DATETIME_HISTORY#<datetime>  |
| Favorites | USER#<username>   | DATETIME_FAVORITE#<datetime> |

### DynamoDB Examples

### DynamoDB Access Patterns
- Get videos in group. Query: "PK = GROUP#laney"
  - NOTE - this could be for anonymous users
- Get videos in group that are not in the user's history. Query TODO: "PK = GROUP#laney" (NOTE - this could be for authenticated users). QUESTION - Is history restricted to within a group?
- Get history for user (potentially paginate by date). Query: "PK = USER#andrew AND BEGINS_WITH(SK, 'DATETIME_HISTORY#')". Should not be unique by user / datetime. Also, do you want the same object showing up in history multiple time? Maybe have it at an hour-level granularity or something? Or maybe day?
- Get favorites for user (potentially paginate by date). Query: "PK = USER#andrew AND BEGINS_WITH(SK, 'DATETIME_FAVORITE#')". NOTE - We'll want this to be unique and probably not by user / datetime. It should be user / s3objectname. Do you need to worry about the group of the s3objectname?
- Add video to group
- Update video group (delete from one group and add to another)
- Add favorite
- Delete favorite
- Share video?
- TODO - admin access patterns

## Roadmap
### Next
- Cognito w/ Amazon (and maybe Google?)
- Step function for doing all the daily processing steps
- How will you store and retrieve favorites?
  - Dynamo?
  - Do they need to be ordered by time of favoriting? Seems like they should be
- How will you handle admin workflow?
- Figure out Access-Control-Allow-Origin. Right now I think we have it configured to * when it should just be laney-bug.com, but I also want it to work during local development (localhost)
- Reduce lambda's permissions
- Cleanup execution role
- Cleanup RDS stuff from covidnotificationservice
- Make it so a user can only access their folder
- Add MFA delete to s3 videos
- Consider adding a check so only filenames in the /videos folder can be written elsewhere
- Handle case where nothing loads. Turn wifi off to test. One issue is there will be lots of failed requests.
- Light-mode / Dark-mode
- Find tree component for history hierarchy https://reactjsexample.com/tag/tree/ . Maybe make it from scratch? https://blog.logrocket.com/comparing-react-tree-components/

- Add justification for design
- Add Dynamo
    - Is there a way to identify a small set of random, unseen videos for the user completely on the backend? Might need extra services. If this is taking too long, just do it on the frontend for now.
    - Create dynamodb instance and table(s)
    - Update api to fetch from dynamodb
    - Update api to update dynamodb
    - Add small amount of migration data
        - Write script to migrate data from laney.json to dynamodb (GROUP#laney) and migrate
        - Try having frontend fetch laney video list from dynamodb
        - Update script to migrate data from other json files (skip, other) to dynamodb and migrate
        - Write script to migrate data from s3 bucket (or maybe videoList.json?) to dynamodb (GROUP#new if not in any of the other groups) and migrate
    - Have site record viewed videos
    - Only show not viewed videos
    - Figure out how we want to uniquely identify user for now (probably will use federation in the future)
    - Do full migration
    - Remove json files (NOTE - I don't know if I should do this before updating admin to not use jsonfiles and localStorage)
- Consider api gateway cache for retrieving json files. This could save on the read cost.
- Lambda to add new tiktoks to s3
- s3 events that add new objects to dynamodb GROUP#new
- Change admin to use dynamodb
  - Pull video list from GROUP#new
  - Remove from GROUP#new and add to GROUP#<selection>. Could experiment with this being a transaction.
- Add favorite functionality
- Add logging and dashboards

- Report script that checks data in all systems and identifies anything missing and reports on the state of things?

- Consider moving error'd videos into a separate group for future investigation

- Share video?
- Create dev environment

- Script to check what videos are not in s3 and then upload them
- Show different pages for /, /skip, /other, and /admin
- Set up lambda to add new tiktoks at a regular interval
- Curate more videos
- After curating more videos, push changes to github and make sure they propagate to live site
- Automatically move liked tiktoks to project
- Add history functions
- Only show videos not previously seen
- Add code pipeline so changes pushed to github automatically get propagated to site
- BUG - In Admin, clicking a button will mean it's focused and hitting spacebar afterwards will trigger the same button
- Make invalidations in CloudFront automatic after code changes
- Add trouble shooting guides
- Get routing working in gh-pages url. Works locally and in prod, but not in the actual gh-pages site.

- Make initial load of screen as fast as possible
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
- Add eslint. Maybe prettier if it's not already?

### Optional
- Make sure arrows always work. I think it's a focus issue.
- Make background related to video being shown
- Make tabs easier to see and select
- Get rid of unnecessary app folder
- Avoid having to prefix json requests w/ LaneyBug2
- Turn into an app?
- Create a cloudformation for this project for others to be able to create their own

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

/events
    /kathy
        /view
            /aggregate.json
            /2021
                /01
                    /01
                        /video1.mp4
        /favorite
            /aggregate.json
    /andrew
/data (category, group, type, channel, section, topic, domain)
    /laney (general, main, primary, approved, public)
        /aggregate.json (data.json, output.json, summary.json)
        /video1.mp4
    /other (private, andrew, secondary, unapproved)
        /aggregate.json
    /skip
    /error
    /raw (new, unprocessed, needsReview) // This can be calculated from videos in the /videos folder but not in any of the json
        /video2.mp4






http://laney-bug.com/


Google
    ClientID - 934914015863-16l8d98h298c138eqca115cf2l587k3a.apps.googleusercontent.com
    Client Secret - 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


