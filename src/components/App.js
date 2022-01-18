import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  // console.log(filters)

  function handleFindPets() {const fetchFilters = filters.type === "all" ? "pets" : `pets?type=${filters.type}`

    fetch(`http://localhost:3001/${fetchFilters}`)
    .then(r => r.json())
    .then(pets => setPets(pets))
  }

  // console.log(pets)

  function handleAdoptPet(adoptedPetId) {

    const updatedPets = pets.map(pet => {
      if(pet.id === adoptedPetId) {
        return {...pet, isAdopted: true}
      }
      else return pet
    })
    setPets(updatedPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={value => setFilters({type: value})} onFindPetsClick={handleFindPets} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
