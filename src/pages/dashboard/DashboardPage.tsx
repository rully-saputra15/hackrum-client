import { FC } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Question } from "../../interfaces";
import Loading from "../../components/Loading";
import { primaryColor, secondaryColor } from "../../styles";
import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";
import Select from "../../components/Select";

type DashboardPageProps = {
  data: Question[];
  isLoading: boolean;
  filteredPhase: string;
  handleNavigateQuestionDetail: (id: string) => void;
  handleLogout: () => void;
  handleShowModal: () => void;
  handleFilterQuestions: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DashboardPage: FC<DashboardPageProps> = ({
  data,
  isLoading,
  filteredPhase,
  handleNavigateQuestionDetail,
  handleLogout,
  handleShowModal,
  handleFilterQuestions,
}) => {
  return (
    <section className="flex flex-col space-y-5 relative">
      <div className="flex flex-row justify-between items-center w-full">
        <Button handleClick={handleLogout} label="Logout" />
        <h1
          className={`font-bold text-4xl grow text-center text-transparent bg-clip-text bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}]`}
        >
          Questions
        </h1>
        <IoMdAddCircleOutline
          className="cursor-pointer text-2xl"
          onClick={handleShowModal}
        />
      </div>
      <div className="w-32">
        <Select label="Filter Phase" handleChange={handleFilterQuestions}>
          <option value="all">All</option>
          <option value="0">Phase 0</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
        </Select>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-row justify-center md:justify-start gap-3 flex-wrap">
          {data
            .filter((val) => {
              if (
                filteredPhase === "all" ||
                filteredPhase === "" ||
                +val.phase === +filteredPhase
              ) {
                return val;
              }
            })
            .map((question: Question) => (
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
