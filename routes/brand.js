import express from "express";
import { Brands } from "../models";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/", async (req, res) => {
  try {
    await Brands.create(req.body);
    res.status(200).json({ message: "브랜드 추가 성공" });
  } catch (err) {
    res.status(500).json({ message: "오류 발생", error: err.stack });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await Brands.findAll();
    res.status(200).json({ message: "전체 브랜드 조회 성공", data: result });
  } catch (err) {
    res.status(500).json({ message: "오류 발생", error: err.stack });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Brands.findOne({ where: { id: req.params.id } });
    if (result) {
      res.status(200).json({ message: "브랜드 조회 성공", data: result });
    } else {
      res.status(502).json({ message: "존재하지 않는 브랜드" });
    }
  } catch (err) {
    res.status(500).json({ message: "오류 발생", error: err.stack });
  }
});

router.put("/", async (req, res) => {
  try {
    if (await Brands.findOne({ where: { id: req.body.id } })) {
      await Brands.update(req.body.data, { where: { id: req.body.id } });
      res.status(200).json({ message: "브랜드 수정 성공" });
    } else res.status(502).json({ message: "존재하지 않는 브랜드" });
  } catch (err) {
    res.status(500).json({ message: "오류 발생", error: err.stack });
  }
});

router.delete("/", async (req, res) => {
  try {
    if (await Brands.findOne({ where: { id: req.body.id } })) {
      await Brands.destroy({ where: { id: req.body.id } });
      res.status(200).json({ message: "브랜드 삭제 성공" });
    } else res.status(502).json({ message: "존재하지 않는 브랜드" });
  } catch (err) {
    res.status(500).json({ message: "오류 발생", error: err.stack });
  }
});

export default router;
