import React, { useState, useEffect } from "react";
// import utils from './utils.js'
// import storage from './storage.js'

const STORAGE = chrome.storage.local;

const getData = (key) => {
  return new Promise((resolve) => {
    STORAGE.get(key, (result) =>
      result[key] ? resolve(result[key]) : resolve({})
    );
  });
};

const DynamicText = (props) => {
  // Declare a state variable 'text' and its setter 'setText' with an initial value

  const [text, setText] = useState("");
  const setInitialVals = async () => {
    const initVals = await getData("sites");
    const initSites = initVals;
    setText(props.urlName + ": " + initSites[props.urlName]);
  };
  setInitialVals();
  // useEffect hook to update the text every 10 seconds
  useEffect(() => {
    // Set up an interval to update the text
    const fetchDataAndUpdateText = async () => {
      try {
        const siteDict = await getData("sites"); // Await the getData Promise
        const newText = props.urlName + ": " + siteDict[props.urlName]; // Use the retrieved data
        console.log(
          "updating " + props.urlName + " to " + siteDict[props.urlName]
        );
        setText(newText); // Update text with the retrieved value
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Set up an interval to fetch and update the text every 10 seconds
    const intervalId = setInterval(fetchDataAndUpdateText, 5000); // 10 seconds interval

    // Cleanup function to clear the interval when the component unmounts or re-renders
    return () => clearInterval(intervalId);
  }, [props.urlName]); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div>
      <h1>{text}</h1> {/* Display the dynamic text */}
      {/* Additional JSX content */}
    </div>
  );
};

export default DynamicText;
