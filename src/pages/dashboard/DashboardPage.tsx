import { FC } from "react";
import { AiOutlineCheckCircle, AiOutlineQuestionCircle } from "react-icons/ai";

type DashboardPageProps = {
  data: Question[];
};

const DashboardPage: FC<DashboardPageProps> = ({ data }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-3">
      <span className="font-bold text-2xl">Questions</span>
      <div className="flex flex-row justify-start gap-3">
        {data.map((question: Question) => (
          <div
            className="p-4 border border-gray-300 w-56 rounded-lg shadow-md flex flex-col relative"
            key={question.id}
          >
            <span className="font-bold text-lg">
              {question.title.toUpperCase()}
            </span>
            <span className="font-medium text-sm">Phase: {question.phase}</span>
            <div className="font-light text-sm truncate">
              {question.description}
            </div>

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
