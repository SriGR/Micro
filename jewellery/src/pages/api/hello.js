
import { connectDB } from "../../utils/db";

export default async function handler(req, res) {
  try {
    const db = await connectDB();
    const result = await db.request().query(`Exec sp_UserLogin 'a','12345'`); // Replace `Users` with your table name

    res.status(200).json(result.recordset);
  } catch (error) {
    // console.error("Database query error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// export default function handler(req, res) {
//     res.status(200).json({ message: 'Hello from Next.js!' })
//   }