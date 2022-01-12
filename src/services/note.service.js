import Note from '../models/note.model';

//create note
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

//get all notes
export const getAllNotes = async(noteData) => {
    const data = await Note.find({
        userId: noteData.userId,
        isArchieved: false,
        isDeleted: false
    });
    if (data) {
        return data;
    }
}

//get single note
export const getNote = async(_id) => {
    const data = await Note.findById({ _id });
    return data;
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
    return data;
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