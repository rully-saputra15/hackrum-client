import { FC } from "react";
import { Question } from "../interfaces";
import Badge from "./Badge";
import { AiOutlineCheckCircle, AiOutlineQuestionCircle } from "react-icons/ai";

type QuestionCardProps = {
  question: Question;
  handleClick: () => void;
};

const QuestionCard: FC<QuestionCardProps> = ({ question, handleClick }) => {
  return (
    <article
      className={`p-5 border border-gray-300 w-56 rounded-lg shadow-md flex flex-col justify-between relative basis-52 gap-3 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white`}
      onClick={handleClick}
      key={question.id}
    >
      <div>
        <h2 className="font-bold text-lg line-clamp-2">
          {question.title.toUpperCase()}
        </h2>
        <span className="font-medium text-sm">Phase: {question.phase}</span>
        <p className="font-light text-sm line-clamp-2">
          {question.description}
        </p>
      </div>
      <Badge
        backgroundColor={question.type.color}
        label={question.type.title}
      />
      {question.status === "active" && (
        <div className="absolute top-2 right-2 text-orange-500 text-xl">
          <AiOutlineQuestionCircle />
        </div>
      )}
      {question.status === "solved" && (
        <div className="absolute top-2 right-2 text-green-700 text-xl">
          <AiOutlineCheckCircle />
        </div>
      )}
    </article>
  );
};

export default QuestionCard;
