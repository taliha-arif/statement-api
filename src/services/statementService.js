const { generatePDF } = require("../utils/pdfGenerator");
const { fetchStatementData } = require("./coreBankingService");

const jobs = {}; // In-memory store for job status

exports.processStatement = (accountNumber, fromDate, toDate) => {
  const jobId = new Date().getTime().toString();

  // Initial job status as "processing"
  jobs[jobId] = { status: "processing" };

  // Background job execution with a delay
  setTimeout(async () => {
    try {
      // Step 1: Fetch the statement data from the Core Banking system
      const statementData = await fetchStatementData(
        accountNumber,
        fromDate,
        toDate
      );

      // Step 2: Generate the PDF (simulated), template engine to generate data e,g; ejs
      console.log("statementdata", statementData);
      const pdfBytes = await generatePDF(statementData);

      // Step 3: Notify user(currently console.log),
      // Storing the result in the job store and mark it as completed
      console.log("Your account statement is ready to download.", pdfBytes);

      jobs[jobId] = {
        status: "completed",
        link: `/download/${jobId}`, // Link for the user to download the PDF
        pdfBytes, // PDF content
      };
    } catch (error) {
      // Step 4: Handling errors and update job status
      jobs[jobId] = { status: "failed", error: error.message };
    }
  }, 1000); // Delay for processing

  // Returning the job ID immediately to the user
  return jobId;
};

exports.getJobStatus = (jobId) => {
  return jobs[jobId];
};
