import { generateEnquiryEmail } from "../services/email.service.js";
//________________________________________________________________________//
//                     Student Query Email                                  //
//________________________________________________________________________//
export const emailController = async (req, res) => {
    const { fullName, email, phoneNo, course, message } = req.body;
    if (!fullName || !phoneNo || !course) {
        return res.status(400).json({ success: false, message: "name , phoneNo and course are required" });
    }
    try {
        generateEnquiryEmail({ fullName, email, phoneNo, course, message });
        return res
            .status(200)
            .json({ success: true, message: "Query sent successfully" });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
};
