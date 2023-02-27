import React, { FC, useMemo, useState } from 'react';
import Layout from '@/common/components/layout/Layout';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import Link from 'next/link';
import ReactSelect from 'react-select';
import { Tag, Note } from '@/@types/notes.interface';
import NoteCard from '@/modules/home/components/note-card/NoteCard';

interface IHomeProps {
	availableTags: Tag[];
	inputId: string;
	notes: Note[];
}

const Home: FC<IHomeProps> = ({ availableTags, inputId, notes }) => {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState<string>('');
	const filteredNotes = useMemo(() => {
		return notes.filter(note => {
			return (
				(title === '' ||
					note.title.toLowerCase().includes(title.toLowerCase())) &&
				(selectedTags.length === 0 ||
					selectedTags.every(tag =>
						note.tags.some(noteTag => noteTag.id === tag.id)
					))
			);
		});
	}, [title, selectedTags, notes]);

	return (
		<Layout title='Home'>
			<Row className='align-items-center mb-4'>
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs='auto'>
					<Stack gap={2} direction='horizontal'>
						<Link href='/new'>
							<Button variant='primary'>Create New Note</Button>
						</Link>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className='mb-4'>
					<Col>
						<Form.Group controlId='title'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								value={title}
								onChange={e => setTitle(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label htmlFor={inputId}>Tags</Form.Label>
							<ReactSelect
								inputId={inputId}
								instanceId={inputId}
								options={availableTags.map(tag => {
									return { label: tag.label, value: tag.id };
								})}
								value={selectedTags.map(tag => {
									return { label: tag.label, value: tag.id };
								})}
								onChange={tags => {
									setSelectedTags(
										tags.map(tag => {
											return { label: tag.label, id: tag.value };
										})
									);
								}}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
				{filteredNotes.map(note => (
					<Col key={note.id}>
						<NoteCard id={note.id} title={note.title} tags={note.tags} />
					</Col>
				))}
			</Row>
		</Layout>
	);
};

export default Home;
