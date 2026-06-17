import { Router } from "express";

const router = Router({mergeParams:true});

router.post("/bill",billController);