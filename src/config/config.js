
// export const cookieOptions = {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "Lax",
//     maxAge: 1000 * 60 * 60 * 24 *7
// }

export const cookieOptions = {
    httpOnly: true,
    secure: true, // Render should serve over HTTPS
    sameSite: "None", // Needed for cross-site cookies
    maxAge: 1000 * 60 * 60 * 24 * 7
}
