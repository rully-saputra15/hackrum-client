import { FC } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { Question } from "../../interfaces";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import { primaryColor } from "../../styles";

type QuestionDetailPageProps = {
  answer: EditorState;
  role: string;
  question: Question;
  handleGoBack: () => void;
  handleAnswerChange: (answer: EditorState) => void;
  handleSubmitAnswer: () => void;
};

const QuestionDetailPage: FC<QuestionDetailPageProps> = ({
  answer,
  role,
  question,
  handleGoBack,
  handleAnswerChange,
  handleSubmitAnswer,
}) => {
  return (
    <section
      className={`flex flex-col gap-3 border border-[${primaryColor}] rounded-md p-3 bg-white shadow-md`}
    >
      <div className="flex flex-row justify-start gap-2 items-center">
        <BiArrowBack
          onClick={handleGoBack}
          className="text-xl cursor-pointer"
        />
        <h1 className="font-bold text-xl">{question.title}</h1>
      </div>
      <div className="flex flex-row justify-start items-center gap-2">
        <Badge
          backgroundColor={primaryColor}
          label={"Phase " + question.phase}
        />
        <Badge
          backgroundColor={question.type.color}
          label={question.type.title}
        />
      </div>
      <span className="text-md">
        By: <span className="font-bold">{question.user.email}</span>
      </span>
      <span className="font-medium text-md underline underline-offset-8">
        Description
      </span>
      <p
        dangerouslySetInnerHTML={{ __html: question.description }}
        className="text-sm"
      ></p>
      <span className="font-medium text-md underline underline-offset-8">
        Answer
      </span>
      {question.answerAuthorUser && (
        <span className="text-xs">
          by{" "}
          <span className="font-bold">{question.answerAuthorUser.email}</span>
        </span>
      )}
      {role === "instructor" && question.status !== "solved" ? (
        <>
          <Editor
            editorState={answer}
            onEditorStateChange={handleAnswerChange}
            wrapperClassName="border border-gray-300 rounded-md p-2 mt-2"
            editorClassName="border border-gray-300 rounded-md p-2"
            toolbarClassName="border border-gray-300 rounded-md p-2"
            toolbar={{
              image: {
                uploadEnabled: false,
                alt: {
                  present: false,
                  mandatory: false,
                },
              },
            }}
          />
          <Button label="Submit" handleClick={handleSubmitAnswer} />
        </>
      ) : (
        <p
          dangerouslySetInnerHTML={{ __html: question.answer || "-" }}
          className="text-sm"
        ></p>
      )}
    </section>
  );
};

export default QuestionDetailPage;
