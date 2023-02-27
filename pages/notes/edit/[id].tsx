import { NextPage } from 'next';
import EditNote from "../../../src/modules/edit-note/pages/EditNote";
import {useRouter} from "next/router";
import NotFound from "../../../src/modules/not-found/pages/NotFound";
import {useLocalStorage} from "../../../src/hooks/useLocalStorage";
import {Note, RawNote, Tag} from "../../../src/@types/notes.interface";
import React, {useMemo} from "react";

const NoteEditPage: NextPage = () => {
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

  return <EditNote note={note} />;
};

export default NoteEditPage;