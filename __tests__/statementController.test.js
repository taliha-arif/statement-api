const request = require("supertest");
const express = require("express");
const statementController = require("../src/controllers/statementController");
const statementService = require("../src/services/statementService");

// Setup Express app for testing
const app = express();
app.use(express.json());
app.post("/", statementController.generateStatement);
app.get("/:jobId", statementController.downloadStatement);

describe("Statement Controller", () => {
  describe("generateStatement", () => {
    it("should return 404 if required fields are missing", async () => {
      const response = await request(app).post("/").send({});
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Data not valid");
    });

    it("should return 202 and a jobId on valid input", async () => {
      jest
        .spyOn(statementService, "processStatement")
        .mockReturnValue("123456");

      const response = await request(app).post("/").send({
        accountNumber: "123",
        fromDate: "2024-01-01",
        toDate: "2024-01-31",
      });

      expect(response.status).toBe(202);
      expect(response.body).toHaveProperty("jobId");
      expect(response.body.jobId).toBe("123456");
    });
  });

  describe("downloadStatement", () => {
    it("should return 404 if statement is not ready or job does not exist", async () => {
      jest.spyOn(statementService, "getJobStatus").mockReturnValue(null);

      const response = await request(app).get("/123456");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Statement not available");
    });

    it("should return PDF if job is completed", async () => {
      const mockJob = {
        status: "completed",
        pdfBytes: Buffer.from("PDF content"),
      };
      jest.spyOn(statementService, "getJobStatus").mockReturnValue(mockJob);

      const response = await request(app).get("/123456");

      expect(response.status).toBe(200);
      expect(response.header["content-type"]).toBe("application/pdf");
      expect(response.header["content-disposition"]).toBe(
        'attachment; filename="statement-123456.pdf"'
      );
      expect(response.body).toEqual(Buffer.from("PDF content"));
    });
  });
});
