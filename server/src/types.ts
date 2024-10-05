export type APIResponse = {
  success: boolean;
  data: any | null;
  message: string;
};

export type RegisterUser = {
  username: string;
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  username: string;
  created_on: string;
  actions_completed: number;
};

export type Log = {
  id: number;
  user_id: number;
  action: Action;
  timestamp: string;
};

export type Action = {
  name: string;
  icon: string;
};

export const baseActions: Action[] = [
  { icon: "👟", name: "Ran" },
  { icon: "🔬", name: "Studied" },
  { icon: "📝", name: "Wrote" },
  { icon: "🕹️", name: "Gamed" },
  { icon: "🏋️‍♂️", name: "Lifted" },
  { icon: "🏟️", name: "Event" },
  { icon: "🎤", name: "Concert" },
  { icon: "🎬", name: "Movie" },
  { icon: "🧳", name: "Traveled" },
  { icon: "🍎", name: "Schooled" },
  { icon: "⌨️", name: "Coded" },
  { icon: "💼", name: "Worked" },
  { icon: "💤", name: "Napped" },
  { icon: "🍳", name: "Cooked" },
  { icon: "🛠️", name: "Fixed Stuff" },
  { icon: "💲", name: "Sold" },
  { icon: "🍹", name: "Partied" },
  { icon: "📜", name: "Read" },
  { icon: "✏️", name: "Homework" },
  { icon: "🛍️", name: "Shopped" },
  { icon: "⚽", name: "Played" },
  { icon: "🌹", name: "Date" },
  { icon: "🗓️", name: "Appointment" },
];
