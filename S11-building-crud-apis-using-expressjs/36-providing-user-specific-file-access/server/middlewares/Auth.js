import usersData from "../usersDB.json" with {type: "json"}

export const CheckAuth = (req, res, next) => {
    const { uid } = req.cookies;
    const user = usersData.find((user) => user.id === uid)
    if (!uid || !user) return res.status(401).json({ error: "Not logged in!" })
    req.user = user;
    next()
}