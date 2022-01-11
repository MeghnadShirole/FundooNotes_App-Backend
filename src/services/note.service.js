import Note from '../models/note.model';

export const newNote = async(noteData) => {
    var newNote = new Note({
        "title": noteData.title,
        "content": noteData.content,
        "color": noteData.color,
        "isArchieved": noteData.isArchieved,
        "isDeleted": noteData.isDeleted,
        "userId": noteData.userId
    })
    const result = await newNote.save(noteData);
    return result;
}