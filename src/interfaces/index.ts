export interface Question {
  id: string;
  title: string;
  description: string;
  type: ProblemType;
  status: string;
  imgUrl: string;
  user: {
    email: string
  };
  answer: string;
  phase: string;
}

export interface ProblemType {
  title: string;
  color: string;
}
