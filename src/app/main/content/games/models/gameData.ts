export interface GameData{

  description?: string;
  isPublic?: boolean;
  name?: string;
  questions: [
    {
      type: string,
      question: string;
      answers: [
        {
        answer: string;
        isCorrect: boolean;
        }
      ]
    }

  ];
}
