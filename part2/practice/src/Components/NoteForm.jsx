const NoteForm = ({ addNote, newNote, handleNoteChange }) => {
  return (
    <form action="" onSubmit={addNote}>
      <input type="text" value={newNote} onChange={handleNoteChange} />
      <button type="submit">Save</button>
    </form>
  )
}

export default NoteForm
