import { FC, FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import CreatableReactSelect from 'react-select/creatable';
import Link from 'next/link';
import { NoteData, Tag } from '@/@types/notes.interface';
import { v4 as uuidV4 } from 'uuid';
import { useRouter } from 'next/router'

interface INoteFormProps {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
	inputId: string;
}

const NoteForm: FC<INoteFormProps> = ({ onSubmit, onAddTag, availableTags, inputId }) => {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const router = useRouter()

	const submitHandler = (e: FormEvent) => {
		e.preventDefault();

		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		});
		router.push('/')
	};

	return (
		<Form onSubmit={submitHandler}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId='title'>
							<Form.Label>Title</Form.Label>
							<Form.Control ref={titleRef} required />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label htmlFor={inputId}>Tags</Form.Label>
							<CreatableReactSelect
								inputId={inputId}
								instanceId={inputId}
								onCreateOption={label => {
									const newTag = { id: uuidV4(), label };
									onAddTag(newTag);
									setSelectedTags(prevState => [...prevState, newTag]);
								}}
								options={availableTags.map(tag => {
									return {label: tag.label, value: tag.id}
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
				<Form.Group controlId='markdown'>
					<Form.Label>Body</Form.Label>
					<Form.Control ref={markdownRef} required as='textarea' rows={15} />
				</Form.Group>
				<Stack direction='horizontal' gap={2} className='justify-content-end'>
					<Link href='/'>
						<Button type='button' variant='outline-secondary'>
							Cancel
						</Button>
					</Link>
					<Button type='submit' variant='primary'>
						Save
					</Button>
				</Stack>
			</Stack>
		</Form>
	);
};

export default NoteForm;
