export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "completed";
  lastContact: string;
  cases: number;
}
