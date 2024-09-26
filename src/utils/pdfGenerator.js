const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const ejs = require("ejs");

exports.generatePDF = async (statementData) => {
  try {
    // Read the EJS template file
    const templatePath = path.join(
      __dirname,
      "../templates/statementTemplate.ejs"
    );
    const templateContent = fs.readFileSync(templatePath, "utf8");

    // Render the HTML content using EJS and statement data
    const html = ejs.render(templateContent, statementData);

    // Launch Puppeteer to generate the PDF from HTML
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return pdfBuffer;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("PDF generation failed");
  }
};
