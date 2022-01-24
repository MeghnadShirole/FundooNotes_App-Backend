import Note from '../models/note.model';
import { client } from '../config/redis';

//create a new note
export const newNote = async(noteData) => {
    var newNote = new Note({
        "title": noteData.title,
        "content": noteData.content,
        "color": noteData.color,
        "isArchieved": false,
        "isDeleted": false,
        "userId": noteData.userId
    })
    const data = await newNote.save(noteData);
    if (data) {
        await client.del('allNotes');
        return data;
    }
}

//get all notes
export const getAllNotes = async(noteData) => {
    const data = await Note.find({
        userId: noteData.userId,
        isArchieved: false,
        isDeleted: false
    });
    if (data) {
        await client.set('allNotes', JSON.stringify(data));
        return data;
    }
}

//get single note
export const getNote = async(_id) => {
    const data = await Note.findById({ _id });
    if (data) {
        await client.set('singleNote', JSON.stringify(data));
        return data;
    }
};

//update note
export const updateNote = async(_id, notedata) => {
    const data = await Note.findByIdAndUpdate({
            _id
        },
        notedata, {
            new: true
        }
    );
    if (data) {
        await client.del('allnotes');
        await client.del('singleNote');
        await client.set('singleNote', JSON.stringify(data));
        return data;
    }
};

//archieve a note
export const archieveNote = async(_id, noteData) => {
    const data = await Note.findByIdAndUpdate({
        _id
    }, {
        $set: {
            isArchieved: true
        },
    });
    noteData, {
        new: true,
    }
    return data;
}

//trash a note
export const trashNote = async(_id, noteData) => {
    const data = await Note.findByIdAndUpdate({
        _id
    }, {
        $set: {
            isDeleted: true,
            isArchieved: false
        },
    });
    noteData, {
        new: true,
    }
    return data;
}

//delete a note
export const deleteNote = async(id) => {
    await Note.findByIdAndDelete(id);
    await client.del('singleNote')
    await client.del('allNotes')
    return '';
};

//get all archieved notes
export const getArchievedNotes = async(noteData) => {
    const data = await Note.find({
        userId: noteData.userId,
        isArchieved: true
    });
    if (data) {
        return data;
    }
}

//get all trashed notes
export const getTrashedNotes = async(noteData) => {
    const data = await Note.find({
        userId: noteData.userId,
        isDeleted: true
    });
    if (data) {
        return data;
    }
}