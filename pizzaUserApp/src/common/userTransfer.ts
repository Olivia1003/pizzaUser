export function transferUser(user) {
    console.log(user)
    user.address = JSON.parse(user.address)
    return user
}