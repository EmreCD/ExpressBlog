const postController = require("./postController");
const postModel = require("../models/postModel");

jest.mock("../models/postModel", () => ({
  addPost: jest.fn(),
  getPosts: jest.fn()
}));

let req, res;

beforeEach(() => {
  req = { 
    body: {}, 
    session: { user: "Ahmet" } 
  };
  res = {
    sendFile: jest.fn(),
    send: jest.fn(),
    redirect: jest.fn(),
    json: jest.fn()
  };
  jest.clearAllMocks();
});

test("showNewPostPage - HTML sayfasını göndermelidir", () => {
  postController.showNewPostPage(req, res);
  
  expect(res.sendFile).toHaveBeenCalled();
});

test("createPost - başlık eksikse hata mesajı vermelidir", () => {
  req.body = { title: "", content: "İçerik var" };

  postController.createPost(req, res);

  expect(res.send).toHaveBeenCalledWith("Baslik ve icerik bos birakilamaz.");
  expect(postModel.addPost).not.toHaveBeenCalled(); 
});

test("createPost - veriler tamsa postu eklemeli ve ana sayfaya yönlendirmelidir", () => {
  req.body = { title: "Yeni Başlık", content: "Yeni İçerik" };

  postController.createPost(req, res);

  expect(postModel.addPost).toHaveBeenCalledWith({
    title: "Yeni Başlık",
    content: "Yeni İçerik",
    author: "Ahmet"
  });
  expect(res.redirect).toHaveBeenCalledWith("/");
});

test("getPostsPage - posts.html sayfasını göndermelidir", () => {
  postController.getPostsPage(req, res);

  expect(res.sendFile).toHaveBeenCalled();
});

test("listPosts - modeldeki postları JSON olarak dönmelidir", () => {
  const sahtePostlar = [{ title: "Test", content: "Test", author: "Anonim" }];
  postModel.getPosts.mockReturnValue(sahtePostlar);

  postController.listPosts(req, res);

  expect(res.json).toHaveBeenCalledWith(sahtePostlar);
});