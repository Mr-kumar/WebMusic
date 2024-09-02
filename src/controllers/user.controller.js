import { asyncHandler } from "../utils/asyncHandler.js";

const registeruser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "chay aur code",
  });
});

export { registeruser };
