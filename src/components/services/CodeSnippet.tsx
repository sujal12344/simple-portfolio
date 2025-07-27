import React from "react";
import { motion } from "framer-motion";
import { codeSnippetData, SERVICES_CONSTANTS } from "@/lib/services-utils";

const CodeLine: React.FC<{ line: any; index: number }> = ({ line, index }) => {
  const { COLORS } = SERVICES_CONSTANTS.CODE_SNIPPET;

  const renderLine = () => {
    switch (line.type) {
      case "declaration":
        return (
          <div className={COLORS.MUTED}>
            <span className={COLORS.KEYWORD}>{line.keyword}</span>{" "}
            <span className={COLORS.VARIABLE}>{line.variable}</span>{" "}
            {line.operator}
          </div>
        );

      case "property":
        return (
          <div className="pl-6">
            <span className={COLORS.PROPERTY}>{line.key}:</span>{" "}
            <span className={COLORS.STRING}>{line.value}</span>,
          </div>
        );

      case "closing":
        return <div className={COLORS.MUTED}>{line.content}</div>;

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {renderLine()}
    </motion.div>
  );
};

export const CodeSnippet: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mt-24 max-w-3xl mx-auto bg-secondary/50 rounded-lg border border-primary/10 overflow-hidden"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-primary/10">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-destructive" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs font-mono text-muted-foreground">
            {codeSnippetData.filename}
          </span>
        </div>
      </div>

      {/* Code content */}
      <div className="p-6 font-mono text-sm space-y-3">
        {codeSnippetData.content.map((line, index) => (
          <CodeLine key={index} line={line} index={index} />
        ))}
      </div>
    </motion.div>
  );
};
