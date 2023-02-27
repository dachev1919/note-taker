import { NextPage } from 'next';
import Home from "../src/modules/home/pages/Home";
import {useLocalStorage} from "../src/hooks/useLocalStorage";
import {RawNote, Tag} from "../src/@types/notes.interface";
import {useMemo} from "react";
import {tagsMockData} from "../src/common/mock-data/tags";
import {notesMockData} from "../src/common/mock-data/notes";

const HomePage: NextPage = () => {
  const [tags] = useLocalStorage<Tag[]>('TAGS', tagsMockData);
  const [notes] = useLocalStorage<RawNote[]>('NOTES', notesMockData);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      };
    });
  }, [notes, tags]);

  return <Home notes={notesWithTags} inputId='home-input-id' availableTags={tags} />;
};

export default HomePage;