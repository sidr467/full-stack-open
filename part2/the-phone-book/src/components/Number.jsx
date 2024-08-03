const Number = ({ result, handleDeletePerson }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {result.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Number
