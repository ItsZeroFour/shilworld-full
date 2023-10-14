import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import crypto from "crypto";
/* ROUTES */
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ path: "./.env" });

const app = express();

/* CONSTANTS */
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },

  filename: (_, file, cb) => {
    cb(
      null,
      crypto
        .createHash("md5")
        .update(
          file.originalname.replace(
            `${file.originalname.replace(
              `${file.mimetype.replace("image/", "")}`,
              ""
            )}`,
            ""
          )
        )
        .digest("hex") + `.webp`
    );
  },
});
const upload = multer({ storage });

/* MIDDLEWARES */
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

/* ROUTES */
app.use("/user", userRoutes);
app.use("/post", postRoutes);

/* IMAGE UPLOAD */
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.json({ message: "Ошибка при загрузке файла" });
  } else {
    res.json({
      url:
        "/uploads/" +
        crypto
          .createHash("md5")
          .update(
            req.file.originalname.replace(
              `${req.file.originalname.replace(
                `${req.file.mimetype.replace("image/", "")}`,
                ""
              )}`,
              ""
            )
          )
          .digest("hex") +
        `.webp`,
    });
  }
});

/* START FUNCTION */
async function start() {
  try {
    await mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Mongo db connected successfully"))
      .catch((err) => console.log(err));

    app.listen(PORT, (err) => {
      if (err) return console.log("App crashed: ", err);
      console.log(`Server started successfully! Port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
