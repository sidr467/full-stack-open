const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@cluster0.s2jl5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false)

mongoose.connect(url).then(() => {
  console.log("Connected to MongoDB")

  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })

  const Note = mongoose.model("Note", noteSchema)

  Note.find({important: true}).then((result) => {
    result.forEach((note) => {
      console.log(note)
    })
    mongoose.connection.close()
  })
  //   const note = new Note({
  //     content: 'HTML is easy',
  //     important: true,
  //   });

  //   return note.save();
  // })
  // .then(result => {
  //   console.log('Note saved!');
  //   return mongoose.connection.close();
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  //   mongoose.connection.close();
})
