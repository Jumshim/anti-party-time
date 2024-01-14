import React, { useState } from 'react';

const SiteListForm = ({ onSubmit }) => {
    const [websiteList, setWebsiteList] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validate and process the website list
      if (websiteList.trim() !== '') {
        onSubmit(websiteList);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Enter a list of websites (please add a comma between all of them):
          <textarea
            value={websiteList}
            onChange={(e) => setWebsiteList(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default SiteListForm;