import express from "express";
import { writeFile } from "fs/promises";
import directoriesData from "../directoriesDB.json" with {type: "json"}
import usersData from "../usersDB.json" with {type: "json"}

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name && !email && !password)
        return res.status(400).json({ message: "All fileds are required!" });
    const user = usersData.find((user) =>
        user.email === email
    )
    if (user) {
        return res.status(409).json({
            success: false,
            message: "Email already exites!"
        })
    }
    const userId = crypto.randomUUID()
    const dirId = crypto.randomUUID()
    const dirName = `root-${email}`
    const parentDirId = null;
    const files = []
    const directories = []
    usersData.push({ id: userId, name, email, password, rootDirId: dirId })
    directoriesData.push({ id: dirId, name: dirName, userId, parentDirId, files, directories })
    try {
        await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
        await writeFile("./usersDB.json", JSON.stringify(usersData));
        return res.status(201).json({
            success: true,
            message: "User created successfully."
        })
    } catch (error) {
        return res.status(401).json({
            success: true,
            message: "Failed to create user!"
        })
    }

});

router.post("/login", (req, res) => {
    const {email, password} =  req.body;
    const user = usersData?.find((user) => user.email === email)
    if(!user || user.password !== password) return res.status(404).json({
        error: "Invalid credentials!"
    })
    res.cookie("uid", user?.id, {
        httpOnly: true,
        maxAge: 60 * 1000 * 60 * 24 * 7
    })
    res.json({
        message: "Logged in"
    })
})

export default router;
