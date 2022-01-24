// type Children = {
//   id: string;
//   title: string;
//   value: number;
//   color: string;
//   timestamp: number;
//   notes: string;
// };

export type Sector = {
  id: string;
  title: string;
  value: number;
  color: string;
  timestamp: number;
  notes: string;
  children: Sector[];
};
