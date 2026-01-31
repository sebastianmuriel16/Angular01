import "reflect-metadata"
import { ExpressApplicationService } from "./services/express-application.service"
import { container } from "tsyringe"

const PORT = 9000

const { app } = container.resolve(ExpressApplicationService)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})