import React from 'react'

// http://www.playingbythebook.net/wp-content/uploads/asterixinstructions2.jpg
export const Search: React.FC = () => {
    return (
      <form  action="" method="get">
          <label htmlFor="image">Enter a image url.</label>
          <input type="url" name="image" id="image" required />
      </form>
    )
};

export default Search;