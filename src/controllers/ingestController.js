import { embedQuery } from "../utils/getTopPassage.js";
import { qdrant } from "../../index.js";



export const ingestArticles = async (req, res) => {
  try {
    const articles = req.body.articles;
    console.log(process.env.QDRANT_CLOUD_KEY, process.env.QDRANT_CLOUD_URL);


    if (!Array.isArray(articles) || articles.length === 0) {
      return res.status(400).send({ error: "No articles provided or invalid format." });
    }

    const collectionName = "news_articles";
    await qdrant.createCollection("news_articles", {
      vectors: {
        text: {
          size: 1024,
          distance: "Cosine",
        },
      },
    });

    const points = await Promise.all(
      articles.map(async (article) => ({
        id: article.id,
        vector: {
          text: await embedQuery(article.text),
        }, payload: { text: article.text, title: article.title },
      }))
    );


    await qdrant.upsert(collectionName, { wait: true, points });


    res.status(200).send({ message: 'Articles ingested successfully!' });
  } catch (error) {
    console.error("Error ingesting articles:", error);
    res.status(500).send({ erro1r: 'Internal server error', error });
  }
};
