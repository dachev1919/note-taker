import React, {FC} from 'react';
import {Note, RawNote} from "@/@types/notes.interface";
import {Badge, Button, Col, Row, Stack} from "react-bootstrap";
import Layout from "@/common/components/layout/Layout";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {useLocalStorage} from "@/hooks/useLocalStorage";

interface INoteDetailsProps {
  note: Note;
}

const NoteDetails: FC<INoteDetailsProps> = ({note}) => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);

  const onDeleteHandler = () => {
    setNotes(prevState => {
      return prevState.filter(item => item.id !== note.id);
    });
  }
  return (
    <Layout title={note.title}>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack
              gap={1}
              direction='horizontal'
              className='flex-wrap mt-2'
            >
              {note.tags.map(tag => (
                <Badge className='text-truncate' key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link href={`/notes/${note.id}/edit`}>
              <Button variant='primary'>Edit</Button>
            </Link>
            <Button variant='outline-danger' onClick={onDeleteHandler}>Delete</Button>
            <Link href={`/`}>
              <Button variant='outline-secondary'>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </Layout>
  );
};

export default NoteDetails;
