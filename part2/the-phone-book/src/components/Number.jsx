const Number = ({result}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {result.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Number
