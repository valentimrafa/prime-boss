export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

export const mockUsers: User[] = [
  { id: 1, name: "Administrador", username: "prime", password: "primeboss" },
];
