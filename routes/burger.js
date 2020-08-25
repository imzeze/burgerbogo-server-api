import express from "express";
import { Burgers, Brands, Reviews } from "../models";

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/", async (req, res) => {
  try {
    if (
      await Brands.findOne({
        where: { id: req.body.brand_id },
      })
    ) {
      await Burgers.create(req.body);
      res.status(200).json({ message: "버거 작성 성공" });
    } else {
      res.status(502).json({ message: "존재하지 않는 브랜드" });
    }
  } catch (err) {
    res.status(500).json({ message: "오류 발생", error: err.stack });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await Burgers.findAll({
      include: [{ model: Brands, attributes: ["name"] }],
    });
    res.status(200).json({ message: "전체 버거 조회 성공", data: result });
  } catch (err) {
    res.status(500).json({ message: "오류 발생", error: err.stack });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Burgers.findOne({
      include: [{ model: Brands, attributes: ["name"] }, { model: Reviews }],
      where: { id: req.params.id },
    });
    if (result) {
      res.status(200).json({ message: "버거 조회 성공", data: result });
    } else {
      res.status(502).json({ message: "존재하지 않는 버거" });
    }
  } catch (err) {
    res.status(500).json({ message: "오류 발생", error: err.stack });
  }
});

router.put("/", async (req, res) => {
  try {
    if (await Burgers.findOne({ where: { id: req.body.id } })) {
      await Burgers.update(req.body.data, { where: { id: req.body.id } });
      res.status(200).json({ message: "버거 수정 성공" });
    } else res.status(502).json({ message: "존재하지 않는 버거" });
  } catch (err) {
    res.status(500).json({ message: "오류 발생", error: err.stack });
  }
});

router.delete("/", async (req, res) => {
  try {
    if (await Burgers.findOne({ where: { id: req.body.id } })) {
      await Burgers.destroy({ where: { id: req.body.id } });
      res.status(200).json({ message: "버거 삭제 성공" });
    } else res.status(502).json({ message: "존재하지 않는 버거" });
  } catch (err) {
    res.status(500).json({ message: "오류 발생", error: err.stack });
  }
});

export default router;
