export const json = {
  logoPosition: "right",
  showProgressBar: "top",
  showTimerPanel: "top",
  questionsOrder: "random",
  isRequired: true,
  completedHtmlOnCondition: [
    {
      expression: "{totalScore} >= 50",
      html: "Go claim your nft! url",
    },
    {
      expression: "{totalScore} < 50",
      html: "LOSER! NOOB.",
    },
  ],
};
