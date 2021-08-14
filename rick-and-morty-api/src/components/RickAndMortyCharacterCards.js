import React from "react";

const rickAndMortyCharactersEndpoint =
  "https://rickandmortyapi.com/api/character";

const RickAndMortyCharactersCards = () => {
  const [characters, setCharacters] = React.useState([]);
  const [isViewingSingleCharacter, setIsViewingSingleCharacter] =
    React.useState(false);
  const [singleCharacterUrl, setSingleCharacterUrl] = React.useState("");
  const [singleCharacterData, setSingleCharacterData] = React.useState({});

  React.useEffect(() => {
    fetch(rickAndMortyCharactersEndpoint)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
      });
  }, [isViewingSingleCharacter]);

  console.log(characters);

  React.useEffect(() => {
    fetch(singleCharacterUrl)
      .then((res) => res.json())
      .then((data) => {
        setSingleCharacterData(data);
        setIsViewingSingleCharacter(true);
      });
  }, [singleCharacterUrl]);

  console.log(singleCharacterData);

  return (
    <React.Fragment>
      {isViewingSingleCharacter ? (
        <React.Fragment>
          <p>singleChar</p>
          <div>Name: {singleCharacterData.name}</div>
          <div>From: {singleCharacterData.origin.name}</div>
          <div>Created: {singleCharacterData.created}</div>
          <div>Link: {singleCharacterData.url}</div>
          <button onClick={() => setIsViewingSingleCharacter(false)}>X</button>
        </React.Fragment>
      ) : (
        <div className="characters-wrapper">
          {characters.map((character) => (
            <div className="character-card" key={character.name}>
              <div className="character-card-top">
                <img src={character.image} alt={character.name} />
              </div>
              <p>Character name: {character.name}</p>
              <p>Species: {character.species}</p>
              <p>Status: {character.status}</p>
              <button onClick={() => setSingleCharacterUrl(character.url)}>
                Get Character Info
              </button>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default RickAndMortyCharactersCards;

// 1. Add a button to each character card

// 2. When a user clicks the button, it should set a piece of state to the character.url property.

// 3. There should be another useEffect hook with the state variable from point 2 in the dependency array.
//    The function inside this use effect should call the api with the endpoint to get a single character

// 4. Handle the promise, set the singleCharacter to state and set the viewingSingleCharacter mode to true

// 5. Add a turnery to the return statement to return different UI is viewingSingleCharacter is true

// 6. Design your UI for this state - don't forget to put in a button that reverts the state back!
