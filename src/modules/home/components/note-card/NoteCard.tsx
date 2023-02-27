import React, { FC } from 'react';
import {Tag} from "@/@types/notes.interface";
import {Badge, Card, Stack} from "react-bootstrap";
import Link from "next/link";
import styles from './NoteCard.module.scss';

interface INoteCardProps {
  id: string;
  title: string;
  tags: Tag[];
}

const NoteCard: FC<INoteCardProps> = ({id, title, tags}) => {
  return (
		<Card
			as={Link}
			href={`/notes/${id}`}
			className={`h-100 text-reset text-decoration-none ${styles.card}`}
		>
			<Card.Body>
				<Stack
					gap={2}
					className='align-items-center justify-content-center h-100'
				>
					<span className='fs-5'>{title}</span>
					{tags.length > 0 && (
						<Stack
							gap={1}
							direction='horizontal'
							className='justify-content-center flex-wrap mt-2'
						>
							{tags.map(tag => (
								<Badge className='text-truncate' key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					)}
				</Stack>
			</Card.Body>
		</Card>
	);
};

export default NoteCard;
