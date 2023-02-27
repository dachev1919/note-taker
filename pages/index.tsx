import { NextPage } from 'next';
import Home from "../src/modules/home/pages/Home";
import {useLocalStorage} from "../src/hooks/useLocalStorage";
import {RawNote, Tag} from "../src/@types/notes.interface";
import {useEffect, useMemo} from "react";
import {tagsMockData} from "../src/common/mock-data/tags";
import {useRouter} from "next/router";

const HomePage: NextPage = () => {
  const router = useRouter();
  const [tags] = useLocalStorage<Tag[]>('TAGS', tagsMockData);
  const [notes] = useLocalStorage<RawNote[]>('NOTES', []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      };
    });
  }, [notes, tags]);

  useEffect(() => {
    if (notes.length < 1) {
      router.push('/new')
    }
  }, [])

  return <Home notes={notesWithTags} inputId='home-input-id' availableTags={tags} />;
};

export default HomePage;