import { FC } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Question } from "../../interfaces";
import Loading from "../../components/Loading";
import { primaryColor, secondaryColor } from "../../styles";
import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";

type DashboardPageProps = {
  data: Question[];
  isLoading: boolean;
  handleNavigateQuestionDetail: (id: string) => void;
  handleLogout: () => void;
};

const DashboardPage: FC<DashboardPageProps> = ({
  data,
  isLoading,
  handleNavigateQuestionDetail,
  handleLogout,
}) => {
  return (
    <section className="flex flex-col justify-center items-center space-y-3 relative">
      <div className="absolute top-2 left-2">
        <Button handleClick={handleLogout} label="Logout" />
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <h1
          className={`font-bold text-4xl grow text-center text-transparent bg-clip-text bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}]`}
        >
          Questions
        </h1>
        <IoMdAddCircleOutline className="cursor-pointer text-2xl" />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-row justify-start gap-3 flex-wrap">
          {data.map((question: Question) => (
            <QuestionCard
              key={question.id}
              question={question}
              handleClick={() => handleNavigateQuestionDetail(question.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default DashboardPage;
