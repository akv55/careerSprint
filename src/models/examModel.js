import { query } from "../config/db.js";

export const createExamResult = async (result) => {
  const { id, user_id, score, risk, skills } = result;
  return query(
    `INSERT INTO exam_results (id, user_id, score, risk, skills) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [id, user_id, score, risk, skills]
  );
};

export const getRecentCandidates = async (limit = 50) => {
  return query(
    `SELECT er.id, u.name, u.email, er.score, er.risk, er.skills, er.created_at
     FROM exam_results er
     JOIN users u ON er.user_id = u.id
     ORDER BY er.created_at DESC
     LIMIT $1`,
    [limit]
  );
};

export const getStats = async () => {
  return query(
    `SELECT
      (SELECT COUNT(*) FROM exam_results WHERE created_at::date = CURRENT_DATE) AS total_exams_today,
      (SELECT COALESCE(AVG(score),0) FROM exam_results) AS avg_score,
      (SELECT COUNT(*) FROM exam_results WHERE risk = 'High') AS high_risk_cases,
      (SELECT COUNT(DISTINCT user_id) FROM exam_results WHERE created_at > NOW() - INTERVAL '1 day') AS active_users
    `
  );
};

export const getCandidateById = async (id) => {
  return query(
    `SELECT er.*, u.name, u.email FROM exam_results er JOIN users u ON er.user_id = u.id WHERE er.id = $1`,
    [id]
  );
};
