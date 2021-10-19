import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Carousel } from 'react-responsive-carousel';
import {
  Switch,
  Route,
} from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';

function getRandom(list, count) {
  const set = new Set();
  while (set.size < count && count < list.length) {
    const randomIndex = Math.floor(Math.random() * list.length);
    set.add(list[randomIndex]);
  }
  return Array.from(set);
}

function Player({list}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // TODO - Handle bad urls better
  const rand = getRandom(list, 20);
  const [items, setItems] = useState(rand);
  const addToHistory = useLocalStorage('history');

  const onError = (err, url) => {
    if (err.type === 'error') {
      setItems(items => {
        const newItems = [...items];
        const index = newItems.indexOf(url);
        newItems.splice(index, 1);
        return newItems
      });
    }
  };

  const onPlay = video => {
    addToHistory({
      video,
      epochTime: Date.now(),
    });
  };

  return (
    <div className="App">
      <Carousel onChange={setSelectedIndex} showThumbs={false} useKeyboardArrows showStatus={false} autoFocus>
        {items.slice(0, 10).map((url, index) => (
          <ReactPlayer
            key={url}
            url={`https://laneybug.s3.amazonaws.com/videos/${url}`}
            controls
            loop
            height="auto"
            width="auto"
            playing={index === selectedIndex}
            onPlay={() => onPlay(url)}
            onError={err => onError(err, url)}
          />
        ))}
      </Carousel>
    </div>
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

function Admin() {
  const [index, setIndex] = useState(0);
  const addToLaney = useLocalStorage('laney');
  const addToSkip = useLocalStorage('skip');
  const addToOther = useLocalStorage('other');

  // TODO - Move this to a separate hook
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('videoList.json');
      const json = await response.json();
      setVideoList(json);
    }
    fetchData();
  }, []);

  if (!videoList.length) {
    return null;
  }

  const laneyBug = () => {
    addToLaney(videoList[index]);
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
    if (event.key === ' ') {
      laneyBug();
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
  const onPlay = () => {
    const video = videoList[index];
    console.log('video', video, Date.now());
  };

  // TODO - Consider breaking ReactPlayer out into it's own component to be reused
  return (
    <div onKeyPress={onKeyPress}>
      <div className="button-section">
        <button onClick={laneyBug}>LaneyBug</button>
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
        onPlay={onPlay}
        onError={err => onError(err, videoList[index])}
        className="admin-player"
      />
    </div>
  );
}

function View({file}) {
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(file);
      const json = await response.json();
      setVideoList(json);
    }
    fetchData();
  }, [file]);

  if (!videoList.length) {
    return null;
  }

  return <Player list={videoList} />;
}

function History() {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  return (
    <div>
      {history.reverse().map(({epochTime, video})=> (
        <div>
          <div>{(new Date(epochTime)).toDateString()}</div>
          <div>
            <ReactPlayer
              url={`https://laneybug.s3.amazonaws.com/videos/${video}`}
              controls
              loop
              height="auto"
              width="auto"
              className="admin-player"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <View file="laney.json" />
      </Route>
      <Route path="/history">
        <History />
      </Route>
      <Route path="/other">
        <View file="other.json" />
      </Route>
      <Route path="/skip">
        <View file="skip.json" />
      </Route>
      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  );
}

export default App;
