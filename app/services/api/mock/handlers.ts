// import { factory, primaryKey } from "@mswjs/data"
// import { datatype, name } from "faker"
// import { default as userMocks } from "./queries/user.mock"
// import { default as formMocks } from "./queries/forms.mock"
import syncMocks from "./queries/sync.mock"
import userMocks from "./queries/users.mock"

// export const db = factory({
//   user: {
//     id: primaryKey(datatype.uuid),
//     firstName: name.firstName,
//     lastName: name.lastName,
//   },
// })

// for (let i = 0; i < 20; i++) {
//   db.user.create()
// }

// export const handlers = [...userMocks, ...formMocks, ...addressMock]
export const handlers = [...syncMocks,...userMocks] 
