const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

let movies = [
  {
    id: "1",
    name: "Chiến binh mùa đông",
    totalMovieTime: 180,
    poster: "/chien-binh-mua-dong.jpg",
    trailer: "/chien-binh-mua-dong.mp4",
  },
  {
    id: "2",
    name: "Bố già",
    totalMovieTime: 150,
    poster: "/bo-gia.jpg",
    trailer: "/bo-gia.mp4",
  },
  {
    id: "3",
    name: "Telnet",
    totalMovieTime: 280,
    poster: "/telnet.jpg",
    trailer: "/telnet.mp4",
  },
  {
    id: "4",
    name: "Cuộc đời của Pi",
    totalMovieTime: 180,
    poster: "/cuoc-doi-cua-pi.jpg",
    trailer: "/cuoc-doi-cua-pi.mp4",
  },
];
/**
 * Lấy danh sách phim
 *      url:'/movies
 *      method:get
 */
app.get("/movies", (req, res) => {
  res.status(200).send(movies);
});

/**
 * Thêm phim mới
 *      url: "/movies"
 *      method: post
 * @param name
 * @param totalMovieTime
 * @param poster
 * @param trailer
 */
app.post("/movies", (req, res) => {
  const { name, totalMovieTime, poster, trailer } = req.body;
  console.log(req.body);
  if (!name && !totalMovieTime && !poster && !trailer)
    res.status(400).send("Thêm movie mới thất bại");
  let movie = {
    id: (parseInt(movies[movies.length - 1].id) + 1).toString(),
    name,
    totalMovieTime,
    poster,
    trailer,
  };
  movies = [...movies, movie];
  res.status(200).send("Thêm Movie mới thành công");
});

app.get("/movies", (req, res) => {
  res.send("hello from simple server :)");
});

/**
 * lấy chi tiết phim
 *      url:"/movies/:id"
 *      method:get
 * @param id
 */
app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  if (!id || !isNumber(id)) {
    res.status(400).send("Id must be number");
    return;
  }
  let movie = movies.find((mov) => mov.id == id);

  if (movie) res.status(200).send(movie);
  else res.status(400).send(`Không tìm thấy movie với id:${id}`);
});

/**
 * Cập nhật thông tin phim
 *      url:"/movies/:id"
 *      method:put
 * @param id
 */
app.put("/movies/:id", (req, res) => {
  const { id } = req.params;
  const { name, totalMovieTime, poster, trailer } = req.body;

  if (!id || !name || !totalMovieTime || !poster || !trailer) {
    res.status(400).send("Kiểm tra thông tin cập nhật");
    return;
  }

  let indexMovie = movies.findIndex((mv) => mv.id == id);
  console.log(indexMovie);
  if (indexMovie == -1) {
    res.status(400).send(`không tìm thấy phim với id = ${id}`);
    return;
  }

  let movie = { ...movies[indexMovie], name, totalMovieTime, poster, trailer };

  movies[indexMovie] = movie;

  res.status(200).send(movies);
});

/**
 * Xóa phim
 *      url:"/movies/:id"
 *      method:delete
 * @param id
 */
app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  if (!id || !isNumber(id)) {
    res.status(400).send("Id must be number");
    return;
  }
  let indexMovie = movies.findIndex((mov) => mov.id == id);

  if (indexMovie == -1) {
    res.status(400).send(`không tìm thấy phim với id = ${id}`);
    return;
  }
  movies.splice(indexMovie, 1);
  res.status(200).send(`Đã xóa thành công phim có id = ${id}`);
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0);
}
