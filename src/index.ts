import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;
  if (!inputFilePath || !outputFilePath) {
    res.status(400).send("Bad reuest:MIssing file path ");
  }

  ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360")
    .on("end", () => {
      res.status(200).send("Processing Finished successfully");
    })
    .on("error", (err) => {
      console.log(`An error occurred: ${err.message}`);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    })
    .save(outputFilePath); // 360p
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
