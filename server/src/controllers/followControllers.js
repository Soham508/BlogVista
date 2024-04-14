import { query } from "express";
import connectDB from "../db/db.js";

export const followByIdController = async (req, res) => {
  try {
    const { follower_id, followee_id } = req.body;

    const client = await connectDB();

    const query = `
         INSERT INTO followers (follower_id, followed_id)
        VALUES ($1, $2);
    `;
    const result = await client.query(query, [follower_id, followee_id]);
    client.release();

    res.send({
      success: true,
      message: "Followed!",
      result: result || "",
    });
  } catch (err) {
    res.send({
      success: false,
      err,
      message: `Failed to follow, ${err.message}`,
    });
  }
};