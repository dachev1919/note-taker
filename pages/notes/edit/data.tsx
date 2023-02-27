interface INote {
  id: string;
  title: string;
  content: string;
}

export const notesData: INote[] = [
  {
    id: "1",
    title: "Note 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    title: "Note 2",
    content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "3",
    title: "Note 3",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];