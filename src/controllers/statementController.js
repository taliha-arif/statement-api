const statementService = require("../services/statementService");

exports.generateStatement = (req, res) => {
  const { accountNumber, fromDate, toDate } = req.body;

  //basic validation: can use joi or validator
  if (!accountNumber || !fromDate || !toDate) {
    return res.status(404).json({ message: "Data not valid" });
  }

  // Setp1: Start the statement generation process
  const jobId = statementService.processStatement(
    accountNumber,
    fromDate,
    toDate
  );

  // Step2: Send the job ID to the user for tracking
  res.status(202).json({ message: "Statement generation in progress", jobId });
};

exports.downloadStatement = (req, res) => {
  const { jobId } = req.params;
  const job = statementService.getJobStatus(jobId);

  if (!job || job.status !== "completed") {
    return res.status(404).json({ message: "Statement not available" });
  }

  // Setting headers to serve the file as a downloadable PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="statement-${jobId}.pdf"`
  );

  // Sending the PDF as binary data
  res.send(Buffer.from(job.pdfBytes)); // Assuming job.pdfBytes is raw binary data
};
