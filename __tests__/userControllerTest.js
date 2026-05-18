const authController = require("./authController");
const User = require("../models/userModel");

jest.mock("../models/userModel", () => ({
  findByUsername: jest.fn(),
  save: jest.fn(),
  updatePassword: jest.fn()
}));

let req, res;

beforeEach(() => {
  req = {
    body: {},
    session: {
      destroy: jest.fn((callback) => callback(null)) 
    }
  };
  res = {
    sendFile: jest.fn(),
    send: jest.fn(),
    redirect: jest.fn(),
    status: jest.fn().mockReturnThis()
  };
  jest.clearAllMocks();
});

test("getRegisterPage - kullanıcı giriş yapmışsa /posts sayfasına yönlendirmelidir", () => {
  req.session.user = { username: "aktifKullanici" };

  authController.getRegisterPage(req, res);

  expect(res.redirect).toHaveBeenCalledWith("/posts");
});

test("getRegisterPage - kullanıcı giriş yapmamışsa kayıt sayfasını göndermelidir", () => {
  authController.getRegisterPage(req, res);
  expect(res.sendFile).toHaveBeenCalled();
});

test("registerUser - zaten giriş yapmış kullanıcı istek atarsa /posts sayfasına yönlendirmelidir", () => {
  req.session.user = { username: "aktifKullanici" };

  authController.registerUser(req, res);

  expect(res.redirect).toHaveBeenCalledWith("/posts");
});

test("registerUser - alanlar boşsa hata mesajı vermelidir", () => {
  req.body = { username: "", password: "" };

  authController.registerUser(req, res);

  expect(res.send).toHaveBeenCalledWith("Please fill all fields.");
  expect(User.save).not.toHaveBeenCalled();
});

test("registerUser - kullanıcı adı zaten varsa hata mesajı vermelidir", () => {
  req.body = { username: "existUser", password: "123" };
  User.findByUsername.mockReturnValue({ username: "existUser" });

  authController.registerUser(req, res);

  expect(res.send).toHaveBeenCalledWith("This username is already taken.");
});

test("registerUser - veriler tamsa kullanıcıyı kaydetmelidir", () => {
  req.body = { username: "newUser", password: "123" };
  User.findByUsername.mockReturnValue(null);

  authController.registerUser(req, res);

  expect(User.save).toHaveBeenCalledWith({ username: "newUser", password: "123" });
  expect(res.send).toHaveBeenCalledWith("User newUser registered successfully!");
});

test("getLoginPage - kullanıcı giriş yapmışsa /posts sayfasına yönlendirmelidir", () => {
  req.session.user = { username: "aktifKullanici" };

  authController.getLoginPage(req, res);

  expect(res.redirect).toHaveBeenCalledWith("/posts");
});

test("getLoginPage - kullanıcı giriş yapmamışsa giriş sayfasını göndermelidir", () => {
  authController.getLoginPage(req, res);
  expect(res.sendFile).toHaveBeenCalled();
});

test("loginUser - zaten giriş yapmış kullanıcı istek atarsa /posts sayfasına yönlendirmelidir", () => {
  req.session.user = { username: "aktifKullanici" };

  authController.loginUser(req, res);

  expect(res.redirect).toHaveBeenCalledWith("/posts");
});

test("loginUser - alanlar boşsa hata vermelidir", () => {
  req.body = { username: "", password: "" };

  authController.loginUser(req, res);

  expect(res.send).toHaveBeenCalledWith("Lütfen kullanıcı adı ve şifrenizi girin.");
});

test("loginUser - bilgiler doğruysa session oluşturup /posts sayfasına yönlendirmelidir", () => {
  req.body = { username: "salih", password: "456" };
  User.findByUsername.mockReturnValue({ username: "salih", password: "456" });

  authController.loginUser(req, res);

  expect(req.session.user).toEqual({ username: "salih" });
  expect(res.redirect).toHaveBeenCalledWith("/posts");
});

test("loginUser - şifre yanlışsa 401 durum koduyla hata HTML'i dönmelidir", () => {
  req.body = { username: "salih", password: "yanlis_sifre" };
  User.findByUsername.mockReturnValue({ username: "salih", password: "456" });

  authController.loginUser(req, res);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.send).toHaveBeenCalledWith(expect.stringContaining("Kullanıcı adı veya şifre yanlış!"));
});

test("logoutUser - başarılı çıkışta session'ı silip /login sayfasına yönlendirmelidir", () => {
  authController.logoutUser(req, res);

  expect(res.redirect).toHaveBeenCalledWith("/login");
});

test("logoutUser - session silinirken hata oluşursa 500 dönmelidir", () => {
  req.session.destroy = jest.fn((callback) => callback(new Error("Hata")));

  authController.logoutUser(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.send).toHaveBeenCalledWith("Çıkış işlemi sırasında bir hata oluştu.");
});

test("getForgotPasswordPage - kullanıcı giriş yapmışsa /posts sayfasına yönlendirmelidir", () => {
  req.session.user = { username: "aktifKullanici" };

  authController.getForgotPasswordPage(req, res);

  expect(res.redirect).toHaveBeenCalledWith("/posts");
});

test("getForgotPasswordPage - giriş yapmamışsa şifremi unuttum sayfasını göndermelidir", () => {
  authController.getForgotPasswordPage(req, res);
  expect(res.sendFile).toHaveBeenCalled();
});

test("resetPassword - zaten giriş yapmış kullanıcı istek atarsa /posts sayfasına yönlendirmelidir", () => {
  req.session.user = { username: "aktifKullanici" };

  authController.resetPassword(req, res);

  expect(res.redirect).toHaveBeenCalledWith("/posts");
});

test("resetPassword - alanlar boşsa uyarı vermelidir", () => {
  req.body = { username: "", newPassword: "" };

  authController.resetPassword(req, res);

  expect(res.send).toHaveBeenCalledWith("Lütfen kullanıcı adınızı ve yeni şifrenizi girin.");
});

test("resetPassword - kullanıcı bulunamazsa hata HTML'i dönmelidir", () => {
  req.body = { username: "olmayan_biri", newPassword: "789" };
  User.findByUsername.mockReturnValue(null);

  authController.resetPassword(req, res);

  expect(res.send).toHaveBeenCalledWith(expect.stringContaining("Böyle bir kullanıcı bulunamadı."));
  expect(User.updatePassword).not.toHaveBeenCalled();
});

test("resetPassword - kullanıcı varsa şifreyi güncelleyip başarılı HTML'i dönmelidir", () => {
  req.body = { username: "salih", newPassword: "789" };
  User.findByUsername.mockReturnValue({ username: "salih" });

  authController.resetPassword(req, res);

  expect(User.updatePassword).toHaveBeenCalledWith("salih", "789");
  expect(res.send).toHaveBeenCalledWith(expect.stringContaining("Şifreniz başarıyla güncellendi!"));
});