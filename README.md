declare global {
namespace Express {
interface Request {
currentUser: any
}
}
} add this code to: backend/node_modules/@types/express/index.d.ts
# FoodWeb
