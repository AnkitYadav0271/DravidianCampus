import { PDF, StandardFonts, rgb, Standard14Font } from "@libpdf/core";
import { writeFile } from "fs/promises";

async function generateBill(name:string,fatherName:string,course:string,amount:number,mobile:string) {
  const pdf = PDF.create();

  const page = pdf.addPage({
    width: 595, // A4 width in points
    height: 842, // A4 height in points
  });

  const fonts = Standard14Font.of(StandardFonts.Helvetica);
  const boldFont = StandardFonts.HelveticaBold;
  const font = StandardFonts.Helvetica;

  const PAGE_WIDTH = page.width;
  const PAGE_HEIGHT = page.height;

  const MARGIN = 40;

  let cursorY = PAGE_HEIGHT - MARGIN;

  // Helper Functions
  function textWidth(text: string, size: number) {
    return fonts.widthOfTextAtSize
      ? fonts.widthOfTextAtSize(text, size)
      : text.length * size * 0.5;
  }

  function centerX(width: number) {
    return (PAGE_WIDTH - width) / 2;
  }

  function drawLine(gap = 20) {
    page.drawLine({
      start: { x: MARGIN, y: cursorY },
      end: { x: PAGE_WIDTH - MARGIN, y: cursorY },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });

    cursorY -= gap;
  }

  // =========================
  // HEADER
  // =========================

  const firstPart = "Dravidian";
  const secondPart = " Campus";

  const titleSize = 24;

  const firstWidth = textWidth(firstPart, titleSize);
  const secondWidth = textWidth(secondPart, titleSize);

  const totalWidth = firstWidth + secondWidth;

  const startX = centerX(totalWidth);

  page.drawText(firstPart, {
    x: startX,
    y: cursorY,
    size: titleSize,
    font: boldFont,
    color: rgb(0.84, 0.11, 0.22),
  });

  page.drawText(secondPart, {
    x: startX + firstWidth,
    y: cursorY,
    size: titleSize,
    font: boldFont,
    color: rgb(0.3, 0.18, 0.55),
  });

  cursorY -= 30;

  const slogan = "Coaching & Digital Library";

  page.drawText(slogan, {
    x: centerX(textWidth(slogan, 12)),
    y: cursorY,
    size: 12,
    font,
  });

  cursorY -= 30;

  drawLine();

  // =========================
  // RECEIPT INFO
  // =========================

  page.drawText("Fee Receipt", {
    x: MARGIN,
    y: cursorY,
    size: 18,
    font: boldFont,
  });

  page.drawText("Receipt No: DC001", {
    x: PAGE_WIDTH - 180,
    y: cursorY,
    size: 12,
    font,
  });

  cursorY -= 30;

  page.drawText(`Student Name : ${name}`, {
    x: MARGIN,
    y: cursorY,
    size: 12,
    font,
  });

  cursorY -= 20;

  page.drawText(`Fathers Name : ${fatherName}`, {
    x: MARGIN,
    y: cursorY,
    size: 12,
    font,
  });

  cursorY -= 20;

  page.drawText(`Course : ${course}`, {
    x: MARGIN,
    y: cursorY,
    size: 12,
    font,
  });

  cursorY -= 20;



  page.drawText(`Mobile : ${mobile}`, {
    x: MARGIN,
    y: cursorY,
    size: 12,
    font,
  });

  cursorY -= 30;

  drawLine();

  // =========================
  // FEES TABLE
  // =========================

  page.drawText("Description", {
    x: MARGIN,
    y: cursorY,
    size: 13,
    font: boldFont,
  });

  page.drawText("Amount", {
    x: PAGE_WIDTH - 120,
    y: cursorY,
    size: 13,
    font: boldFont,
  });

  cursorY -= 20;

  drawLine(15);

  const fees :{title:string,amount:number} | any = [];
  fees.push({amount,title:course});

  let total = 0;

  for (const fee of fees) {
    page.drawText(fee.title, {
      x: MARGIN,
      y: cursorY,
      size: 12,
      font,
    });

    page.drawText(`₹${fee.amount}`, {
      x: PAGE_WIDTH - 120,
      y: cursorY,
      size: 12,
      font,
    });

    total += fee.amount;

    cursorY -= 25;
  }

  drawLine();

  // =========================
  // TOTAL
  // =========================

  page.drawText("Total Amount", {
    x: MARGIN,
    y: cursorY,
    size: 14,
    font: boldFont,
  });

  page.drawText(`₹${total}`, {
    x: PAGE_WIDTH - 120,
    y: cursorY,
    size: 14,
    font: boldFont,
    color: rgb(0.84, 0.11, 0.22),
  });

  cursorY -= 50;

  drawLine();

  // =========================
  // SIGNATURE
  // =========================

  cursorY -= 50;

  page.drawText("Authorized Signature", {
    x: PAGE_WIDTH - 180,
    y: cursorY,
    size: 12,
    font,
  });

  // Save PDF
  const bytes = await pdf.save();

  await writeFile("fee-receipt.pdf", bytes);

  console.log("PDF Generated Successfully");
}

generateBill("Ankit Yadav","Shyam Bahadur Yadav","Library",500,"7800958614");
