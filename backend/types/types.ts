export type StandardFontType =
  | "Helvetica"
  | "Helvetica-Bold"
  | "Helvetica-Oblique"
  | "Helvetica-BoldOblique"
  | "Times-Roman"
  | "Times-Bold"
  | "Times-Italic"
  | "Times-BoldItalic"
  | "Courier"
  | "Courier-Bold"
  | "Courier-Oblique"
  | "Courier-BoldOblique"
  | "Symbol"
  | "ZapfDingbats";

export type EmailArgs = {
  fullName: string;
  email: any;
  phoneNo: any;
  course: string;
  message?: string;
};


//* Models types are here 

export type AdminType = {
  email:string
  password:string,
  otp:string
}