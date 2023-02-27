import React, { FC, useMemo } from 'react';
import Layout from '@/common/components/layout/Layout';
import NoteForm from '@/modules/new-note/components/note-form/NoteForm';
import { NoteData, RawNote, Tag } from '@/@types/notes.interface';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { v4 as uuidV4 } from 'uuid';


const NewNote: FC = () => {
	const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
	const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);

	const notesWithTags = useMemo(() => {
		return notes.map(note => {
			return {
				...note,
				tags: tags.filter(tag => note.tagIds.includes(tag.id))
			};
		});
	}, [notes, tags]);

	function onCreateNote({ tags, ...data }: NoteData) {
		setNotes(prevNotes => {
			return [
				...prevNotes,
				{ ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }
			];
		});
	}

	function addTag(tag: Tag) {
		setTags(prevState => [...prevState, tag]);
	}

	return (
		<Layout title='New Note'>
			<h1 className='mb-4'>New Note</h1>
			<NoteForm inputId={'custom-input-id'} onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />
		</Layout>
	);
};

export default NewNote;
