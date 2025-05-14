export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

export const mockUsers: User[] = [
  { id: 1, name: "Administrador", username: "admin", password: "123456" },
  { id: 2, name: "João da Silva", username: "joao", password: "abcdef" },
];
