import { validateRequest } from "@/middlewares";
import { CustomRouter } from "@/routes/custom-router";
import { getAuthenticatedAdminController, loginAdminController, logoutAdminController, registerAdminController, sendOtpController } from "@/routes/user/controllers";
import { LoginAdminRequest, RegisterAdminRequest, SendOtpRequest } from "@/routes/user/type";

const cr = new CustomRouter();

cr.post("/register", validateRequest({ body: RegisterAdminRequest }), registerAdminController);
cr.post("/login", validateRequest({ body: LoginAdminRequest }), loginAdminController);
cr.get("/", getAuthenticatedAdminController);
cr.get("/logout", logoutAdminController);

cr.post("/send-otp", validateRequest({ body: SendOtpRequest }), sendOtpController);

export default cr.router;
