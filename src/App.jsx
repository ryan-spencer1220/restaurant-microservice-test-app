import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";
import "./App.css";
import "react-awesome-button/dist/styles.css";

function App() {
  const [restaurantName, setRestaurantName] = useState("");
  const [dataString, setDataString] = useState("");
  const [template, setTemplate] = useState("");
  const [json, setJson] = useState(true);

  const templateFunction = (data) => {
    setTemplate(`
  place_id: ${data.place_id}
  name: ${data.name}
  rating: ${data.rating}
  user_ratings_total: ${data.user_ratings_total}
  formatted_address: ${data.formatted_address}
  phone_number: ${data.phone_number}
  website: ${data.website}
  open_now: ${data.open_now}
  hours:
    Monday: ${data.hours[0]}
    Tuesday: ${data.hours[1]}
    Wednesday: ${data.hours[2]}
    Thursday: ${data.hours[3]}
    Friday: ${data.hours[4]}
    Saturday: ${data.hours[5]}
    Sunday: ${data.hours[6]}
  photo:
    height: ${data.photo.height}
    html_attributions: ${data.photo.html_attributions[0]}
    photo_reference: ${data.photo.photo_reference}
    width: ${data.photo.width}
  reviews:
    author_name: ${data.reviews[0].author_name}
    author_url: ${data.reviews[0].author_url}
    language: ${data.reviews[0].language}
    original_language: ${data.reviews[0].original_language}
    profile_photo_url: ${data.reviews[0].profile_photo_url}
    rating: ${data.reviews[0].rating}
    relative_time_description: ${data.reviews[0].relative_time_description}
    text: ${data.reviews[0].text}
    time: ${data.reviews[0].time}
    translated: ${data.reviews[0].translated}
  
    author_name: ${data.reviews[1].author_name}
    author_url: ${data.reviews[1].author_url}
    language: ${data.reviews[1].language}
    original_language: ${data.reviews[1].original_language}
    profile_photo_url: ${data.reviews[1].profile_photo_url}
    rating: ${data.reviews[1].rating}
    relative_time_description: ${data.reviews[1].relative_time_description}
    text: ${data.reviews[1].text}
    time: ${data.reviews[1].time}
    translated: ${data.reviews[1].translated}
  
    author_name: ${data.reviews[2].author_name}
    author_url: ${data.reviews[2].author_url}
    language: ${data.reviews[2].language}
    original_language: ${data.reviews[2].original_language}
    profile_photo_url: ${data.reviews[2].profile_photo_url}
    rating: ${data.reviews[2].rating}
    relative_time_description: ${data.reviews[2].relative_time_description}
    text: ${data.reviews[2].text}
    time: ${data.reviews[2].time}
    translated: ${data.reviews[2].translated}
  
    author_name: ${data.reviews[3].author_name}
    author_url: ${data.reviews[3].author_url}
    language: ${data.reviews[3].language}
    original_language: ${data.reviews[3].original_language}
    profile_photo_url: ${data.reviews[3].profile_photo_url}
    rating: ${data.reviews[3].rating}
    relative_time_description: ${data.reviews[3].relative_time_description}
    text: ${data.reviews[3].text}
    time: ${data.reviews[3].time}
    translated: ${data.reviews[3].translated}
  
    author_name: ${data.reviews[4].author_name}
    author_url: ${data.reviews[4].author_url}
    language: ${data.reviews[4].language}
    original_language: ${data.reviews[4].original_language}
    profile_photo_url: ${data.reviews[4].profile_photo_url}
    rating: ${data.reviews[4].rating}
    relative_time_description: ${data.reviews[4].relative_time_description}
    text: ${data.reviews[4].text}
    time: ${data.reviews[4].time}
    translated: ${data.reviews[4].translated}
  `);
  };

  const getPlaceInformation = async (restaurant) => {
    fetch(`https://8tq8xw2094.execute-api.us-west-2.amazonaws.com/prod/restaurants?restaurant_name=${restaurant}"`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        setDataString(JSON.stringify(jsonData, null, 2));
        templateFunction(jsonData);
        console.log(jsonData);
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
      });
  };

  return (
    <>
      <h1>Restaurant Finder</h1>
      <p>Fill out the text field below with a restaurant name to recieve more information.</p>
      <p>Example: "Laurelhurst Market", "Nongs Kao Mon Gai SE", "Chipotle Portland Oregon"</p>
      <div className="card">
        <label>
          <input placeholder="Enter a restaurant..." type="text" onChange={(e) => setRestaurantName(e.target.value)} />
        </label>
        <AwesomeButtonProgress
          onPress={async (event, relese) => {
            await getPlaceInformation(restaurantName).then(relese());
          }}
          type="primary"
          size="large"
          releaseDelay={1500}
        >
          Search
        </AwesomeButtonProgress>
      </div>
      {dataString && json && (
        <>
          <AwesomeButton type="secondary" size="large" onPress={() => setJson(!json)} className="aws-btn">
            {json ? "Plain Text" : "JSON"}
          </AwesomeButton>
          <div className="toolbar flex">
            <div className="red"></div>
            <div className="yellow"></div>
            <div className="green"></div>
          </div>
          <SyntaxHighlighter language="json" style={gruvboxDark} className="syntax-highlighter">
            {dataString}
          </SyntaxHighlighter>
        </>
      )}
      {template && !json && (
        <>
          <AwesomeButton type="secondary" size="large" onPress={() => setJson(!json)} className="aws-btn">
            {json ? "Plain Text" : "JSON"}
          </AwesomeButton>
          <div className="toolbar flex">
            <div className="red"></div>
            <div className="yellow"></div>
            <div className="green"></div>
          </div>
          <SyntaxHighlighter language="json" style={gruvboxDark} className="syntax-highlighter">
            {template}
          </SyntaxHighlighter>
        </>
      )}
    </>
  );
}

export default App;
