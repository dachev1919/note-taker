import React, { FC } from 'react';
import NoteForm from '@/modules/new-note/components/note-form/NoteForm';
import Layout from '@/common/components/layout/Layout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import {Note, NoteData, RawNote, Tag} from '@/@types/notes.interface';

interface IEditNoteProps {
  note: Note;
}

const EditNote: FC<IEditNoteProps> = ({ note }) => {
	const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
	const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

	notes.reverse().reverse();

	const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
		setNotes(prevNotes => {
			return prevNotes.map(note => {
				if (note.id === id) {
					return { ...note, ...data, tagIds: tags.map(tag => tag.id) };
				} else {
					return note;
				}
			});
		});
	};

	const addTag = (tag: Tag) => {
		setTags(prevState => [...prevState, tag]);
	};

	return (
		<Layout title='New Note'>
			<h1 className='mb-4'>New Note</h1>
			<NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
				inputId={'new-note-input-id'}
				onSubmit={data => onUpdateNote(note.id, data)}
				onAddTag={addTag}
				availableTags={tags}
			/>
		</Layout>
	);
};

export default EditNote;
