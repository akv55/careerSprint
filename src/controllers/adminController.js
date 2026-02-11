import { getStats, getRecentCandidates, getCandidateById } from "../models/examModel.js";

export const stats = async (req, res) => {
  try {
    const result = await getStats();
    const row = result.rows[0] || {};
    res.json({
      totalExamsToday: parseInt(row.total_exams_today || 0, 10),
      avgReadinessScore: Math.round((row.avg_score || 0) * 100) / 100,
      highRiskCases: parseInt(row.high_risk_cases || 0, 10),
      activeUsers: parseInt(row.active_users || 0, 10),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const candidates = async (req, res) => {
  try {
    const result = await getRecentCandidates(100);
    res.json({ candidates: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const candidateDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getCandidateById(id);
    if (result.rows.length === 0) return res.status(404).json({ message: "Not found" });
    res.json({ candidate: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
