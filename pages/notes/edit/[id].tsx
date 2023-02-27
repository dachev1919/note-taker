import { NextPage } from 'next';
import {useRouter} from "next/router";
import {notesData} from "./data";

const NoteEditPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const note = notesData.find((note) => note.id === id);

  return (
    <div>
      <h1>Edit page for id {note?.id}</h1>
    </div>
  );
};

export default NoteEditPage;