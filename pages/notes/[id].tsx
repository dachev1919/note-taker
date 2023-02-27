import { useRouter } from 'next/router';
import { NextPage } from 'next';

const NotesDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(typeof id)

  return (
    <div>
      <h1>Post details for id {id}</h1>
    </div>
  );
};

export default NotesDetailsPage;