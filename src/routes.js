const userRouter = require("./modules/user/user.route")
const storyRouter = require("./modules/story/story.route")

exports.registerRoutes = (app ) => {
    app.use(userRouter)
    app.use(storyRouter)
}