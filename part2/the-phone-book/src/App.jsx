import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import AddName from "./components/AddName";
import Number from "./components/Number";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAllPersons().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleAdding = (e) => {
    e.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with new number?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .updatePerson(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService.createPerson(newPerson).then((returnedPerson) => {
      console.log(returnedPerson);
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const filterName = (filter) => {
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  let result = filterName(filter);

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleDeletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} value={filter} />
      <AddName
        handleAdding={handleAdding}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <Number result={result} handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
