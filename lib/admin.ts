import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2yU9Tmsy4saU0YBiNSKMASvyLW8",
    "user_2yiRlIJhnqBxYNiR9A8laCDPf9U", //Đạt
    "user_2ycBsnblc37MPWZoiGNpQy3Q9NV", //Tiến
    "user_2ycBQxI2jAg50ybiO3YGRb4SakN", //Tiến
    "user_2ycAgFdnT5eId112BhkRsMfD72x", //Tiến
    "user_2yc8ZsNh4WYAexRlI9Bl9mboOwE", //Tiến
    "user_2yaRGlsTwFsZypQk0bgJffFisA9", //Tâm
]
export const getIsAdmin = async () => {
    const { userId } = await auth();
    
    if(!userId) {
        return false;
    }

    return adminIds.indexOf(userId) !== -1;
}