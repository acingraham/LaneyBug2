import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Carousel } from 'react-responsive-carousel';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { useGoogleAuth } from './GoogleAuthProvider';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

// TODO - Move these calls to a service
// const API_ENDPOINT = 'https://xrkgyvv5tk.execute-api.us-east-1.amazonaws.com/prod/petcuddleotron';
const API_ENDPOINT = 'https://xrkgyvv5tk.execute-api.us-east-1.amazonaws.com/prod';
const VIEW_ENDPOINT = `${API_ENDPOINT}/view`;
const FAVORITE_ENDPOINT = `${API_ENDPOINT}/favorite`;
const GROUP_ENDPOINT = `${API_ENDPOINT}/group`;

function getRandom(list, count) {
  const set = new Set();
  while (set.size < count && count < list.length) {
    const randomIndex = Math.floor(Math.random() * list.length);
    set.add(list[randomIndex]);
  }
  return Array.from(set);
}

function useRecordView(groupId, userId) {
  // TODO - Might want to rename this s3ObjectName throughout the code
  return function(url, email) {
    // TODO - Have this trigger the actual request. Consider adding error logging if it's unable to save for some reason.
    console.log('recording view of', groupId, userId, url, email);
    fetch(VIEW_ENDPOINT, {
      headers: {
        "Content-type": "application/json"
      },
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        groupId,
        userId: email,
        // TODO - Should rename url to something else
        url,
      })
    })
      .then(res => res.json())
      .then(data => console.log('SUCCESS', data))
      .catch(err => console.log('ERROR', err));

  };
}

function useRecordFavorite(groupId, userId) {
  return function(url, isFavorite) {
    // TODO - Have this trigger the actual request. Consider adding error logging if it's unable to save for some reason.
    console.log('recording favorite of', groupId, userId, url, isFavorite);
    // TODO - Switch to await / async
    fetch(FAVORITE_ENDPOINT, {
      headers: {
        "Content-type": "application/json"
      },
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        groupId,
        userId,
        // TODO - Should rename url to something else
        url,
        isFavorite,
      })
    })
      .then(res => res.json())
      .then(data => console.log('SUCCESS', data))
      .catch(err => console.log('ERROR', err));

  };
}

// TODO - I think this should be pushed down the component hierarchy. Reread Dan Abramov's blogpost about this. Seems odd to have the Player return a carousel of ReactPlayers.
function Player({list}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // TODO - Handle bad urls better
  const rand = getRandom(list, 20);
  const [items, setItems] = useState(rand);

  // TODO - This logic should be at the Carousel level. Should see if it has a prop or functionality to handle this case
  const onError = (err, url) => {
    if (err.type === 'error') {
      setItems(items => {
        const newItems = [...items];
        const index = newItems.indexOf(url);
        newItems.splice(index, 1);
        return newItems;
      });
    }
  };

  // TODO - Shouldn't be hardcoding this
  const groupId = 'laney';
  // TODO - Should isolate the mapping of url to group somewhere. Can get this group from the router route.
  const userId = 'andrew';
  const recordView = useRecordView(groupId, userId);
  const data = useGoogleAuth();
  const {isInitialized, isSignedIn, signIn, signOut, googleUser} = data;

  console.log('data', data);

  return (
    <div className="App">
      <Carousel onChange={setSelectedIndex} showThumbs={false} useKeyboardArrows showStatus={false} autoFocus>
        {items.slice(0, 10).map((url, index) => (
          <div key={url} className="login-wrapper">
            {isInitialized && isSignedIn && <button onClick={signOut}>Log Out</button>}
            {isInitialized && !isSignedIn && <button onClick={signIn}>Log In</button>}
            <MyPlayer isSignedIn={isSignedIn} url={url} playing={index === selectedIndex} onError={onError} recordView={recordView} googleUser={googleUser}/>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

function MyPlayer({url, playing, onError, recordView, googleUser, isSignedIn}) {
  useEffect(() => {
    if (playing && isSignedIn) {
      recordView(url, googleUser.profileObj.email);
    }
  }, [playing, isSignedIn]);

  return (
    <ReactPlayer
      url={`https://laneybug.s3.amazonaws.com/videos/${url}`}
      controls
      loop
      height="auto"
      width="auto"
      playing={playing}
      onError={err => onError(err, url)}
    />
  );
}

function Favorite(url) {
  // TODO - This should be a toggle
  const favorite = (url) => {

  };

  const [isFavorite, setIsFavorite] = useState(false);

  const groupId = 'laney';
  const userId = 'andrew';

  useEffect(() => {
    console.log('userId', userId);
    console.log('url', url);
    // TODO - Fix url.url
    fetch(`${FAVORITE_ENDPOINT}/${userId}/${url.url}`, {
      headers: {
        "Content-type": "application/json"
      },
      method: 'GET',
      mode: 'cors',
    })
      .then(res => res.json())
      .then(data => console.log('SUCCESS', data))
      .catch(err => console.log('ERROR', err));
  }, [url]);

  return (
    <span onClick={() => favorite(url)}>Fav: <span>{isFavorite.toString()}</span></span>
  );
}

// TODO - Rename, make it so it only allows an item in one section, and skip items if they're already in localStorage
function useLocalStorage(name) {
  const [array, setArray] = useState(JSON.parse(localStorage.getItem(name)) || []);

  return item => {
    const newArray = array.concat(item);
    const jsonString = JSON.stringify(newArray);
    localStorage.setItem(name, jsonString);
    setArray(newArray);
  };
}

function useS3(group) {
  return url => {
    console.log('recording group of', group, url);
    fetch(GROUP_ENDPOINT, {
      headers: {
        "Content-type": "application/json"
      },
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        group,
        // TODO - Should rename url to something else
        url,
      })
    })
      .then(res => res.json())
      .then(data => console.log('SUCCESS', data))
      .catch(err => console.log('ERROR', err));

  };
}

function Admin() {
  const [index, setIndex] = useState(0);
  const addToMain = useS3('main');
  const addToSkip = useS3('skip');
  const addToOther = useS3('other');

  // TODO - Move this to a separate hook
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      /*
      */

      let response = await fetch('https://laneybug.s3.amazonaws.com/group/new/data.json');
      let videoListJson = await response.json();
      console.log('vidoelist.length', videoListJson.length);
      setVideoList(videoListJson);
    }
    fetchData();
  }, []);

  if (!videoList.length) {
    return null;
  }

  const main = () => {
    addToMain(videoList[index]);
    setIndex(prev => prev + 1);
  };
  const skip = () => {
    addToSkip(videoList[index]);
    setIndex(prev => prev + 1);
  };
  const back = () => {
    setIndex(prev => prev - 1);
  };
  const other = () => {
    addToOther(videoList[index]);
    setIndex(prev => prev + 1);
  };
  const onKeyPress = event => {
    console.log('keypress');
    if (event.key === ' ') {
      main();
    } else if (event.key === 'o') {
      other();
    } else if (event.key === 'b') {
      back();
    }
  };
  const onError = (err, url) => {
    if (err.type === 'error') {
      skip();
    }
  };

  return (
    <div onKeyPress={onKeyPress}>
      <div>{index} / {videoList.length}</div>
      <div className="button-section">
        <button onClick={main}>LaneyBug</button>
        <button onClick={skip}>Skip</button>
        <button onClick={back}>Back</button>
        <button onClick={other}>Other</button>
      </div>
      <ReactPlayer
        url={`https://laneybug.s3.amazonaws.com/videos/${videoList[index]}`}
        controls
        loop
        height="auto"
        width="auto"
        playing={true}
        onError={err => onError(err, videoList[index])}
        className="admin-player"
      />
    </div>
  );
}

function View({file}) {
  const [videoList, setVideoList] = useState([]);
  const {isSignedIn, googleUser} = useGoogleAuth();

  useEffect(() => {
    async function fetchData() {
      // TODO - Make these requests parallel
      const response = await fetch(file);
      let list = await response.json();
      if (isSignedIn && googleUser) {
        try {
          const previouslyViewed = await fetch(`https://laneybug.s3.amazonaws.com/events/${googleUser.profileObj.email}/view/summary.json`);
          const previouslyViewedJson = await previouslyViewed.json();
          const previouslyViewedJsonSet = new Set(previouslyViewedJson);
          list = list.filter(vid => !previouslyViewedJsonSet.has(vid));
        } catch(e) {
          // TODO - Should log this so it's visible in AWS
          console.log('Error occurred trying to fetch previously viewed videos', e);
        }
      }
      setVideoList(list);
    }
    fetchData();
  }, [file, isSignedIn, googleUser]);

  if (!videoList.length) {
    return null;
  }

  return <Player list={videoList} />;
}

function App() {
  return (
    <Switch>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/other">
        <View file="https://laneybug.s3.amazonaws.com/group/other/data.json" />
      </Route>
      <Route path="/skip">
        <View file="https://laneybug.s3.amazonaws.com/group/skip/data.json" />
      </Route>
      <Route path="/">
        <View file="https://laneybug.s3.amazonaws.com/group/main/data.json" />
      </Route>
    </Switch>
  );
}

export default App;
