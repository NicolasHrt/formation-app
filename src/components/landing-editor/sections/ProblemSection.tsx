import "@/styles/rich-text.css";
import { defaultProblemContent } from "../defaultContent";
import { ProblemContent } from "../types";

interface ProblemSectionProps {
  content?: ProblemContent;
  primaryColor?: string;
}

export function ProblemSection({
  content = defaultProblemContent,
  primaryColor = "#D84B2F",
}: ProblemSectionProps) {
  return (
    <div className="bg-[#1C1C1C] text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-24">
          {content.title.split("<br/>").map((part, i) => (
            <span key={i}>
              {part}
              {i < content.title.split("<br/>").length - 1 && <br />}
            </span>
          ))}
        </h1>

        <div className="space-y-32 max-w-4xl mx-auto">
          {content.problems.map((problem, index) => (
            <div key={index} className="flex gap-8 items-start ">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-4">{problem.title}</h2>
                  <div
                    className="rich-text-content max-w-none"
                    dangerouslySetInnerHTML={{ __html: problem.description }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
