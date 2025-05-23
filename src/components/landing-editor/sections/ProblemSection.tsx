import "@/styles/rich-text.css";
import { defaultProblemContent } from "../defaultContent";
import { ProblemContent } from "../types";

interface ProblemSectionProps {
  content?: ProblemContent;
  primaryColor?: string;
}

export function ProblemSection({
  content = defaultProblemContent,
  primaryColor = "orange",
}: ProblemSectionProps) {
  return (
    <div className="  py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-24">
          {content.title.split("<br/>").map((part, i) => (
            <span key={i}>
              {part}
              {i < content.title.split("<br/>").length - 1 && <br />}
            </span>
          ))}
        </h2>

        <div className="space-y-32 max-w-4xl mx-auto">
          {content.problems.map((problem, index) => (
            <div key={index} className="flex gap-8 items-start ">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold mb-4">{problem.title}</h2>
                  <div
                    className="rich-text-content text-muted-foreground max-w-none"
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
