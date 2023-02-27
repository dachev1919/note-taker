import { useRouter } from 'next/router';
import { NextPage } from 'next';
import {useLocalStorage} from "../../src/hooks/useLocalStorage";
import {Note, RawNote, Tag} from "../../src/@types/notes.interface";
import NoteDetails from "../../src/modules/note-details/pages/NoteDetails";
import React, {useMemo} from "react";
import NotFound from "../../src/modules/not-found/pages/NotFound";

const NotesDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [notes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags] = useLocalStorage<Tag[]>('TAGS', []);
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      };
    });
  }, [notes, tags]);
  const note: Note | undefined = notesWithTags.find((note) => note.id === id);

  if (!note) {
    return <NotFound />;
  }

  return <NoteDetails note={note} />;
};

export default NotesDetailsPage;