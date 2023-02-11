import { getGeneralApiProblem, parseApiResponse } from "./api-problem"
import { ApiErrorResponse, ApiResponse } from "apisauce"
import { result } from "lodash"

test("handles connection errors", () => {
  expect(getGeneralApiProblem({ problem: "CONNECTION_ERROR" } as ApiErrorResponse<null>)).toEqual({
    kind: "cannot-connect",
    temporary: true,
  })
})

test("handles network errors", () => {
  expect(getGeneralApiProblem({ problem: "NETWORK_ERROR" } as ApiErrorResponse<null>)).toEqual({
    kind: "cannot-connect",
    temporary: true,
  })
})

test("handles timeouts", () => {
  expect(getGeneralApiProblem({ problem: "TIMEOUT_ERROR" } as ApiErrorResponse<null>)).toEqual({
    kind: "timeout",
    temporary: true,
  })
})

test("handles server errors", () => {
  expect(getGeneralApiProblem({ problem: "SERVER_ERROR" } as ApiErrorResponse<null>)).toEqual({
    kind: "server",
  })
})

test("handles unknown errors", () => {
  expect(getGeneralApiProblem({ problem: "UNKNOWN_ERROR" } as ApiErrorResponse<null>)).toEqual({
    kind: "unknown",
    temporary: true,
  })
})

test("handles unauthorized errors", () => {
  expect(
    getGeneralApiProblem({ problem: "CLIENT_ERROR", status: 401 } as ApiErrorResponse<null>),
  ).toEqual({
    kind: "unauthorized",
  })
})

test("handles forbidden errors", () => {
  expect(
    getGeneralApiProblem({ problem: "CLIENT_ERROR", status: 403 } as ApiErrorResponse<null>),
  ).toEqual({
    kind: "forbidden",
  })
})

test("handles not-found errors", () => {
  expect(
    getGeneralApiProblem({ problem: "CLIENT_ERROR", status: 404 } as ApiErrorResponse<null>),
  ).toEqual({
    kind: "not-found",
  })
})

test("handles other client errors", () => {
  expect(
    getGeneralApiProblem({ problem: "CLIENT_ERROR", status: 418 } as ApiErrorResponse<null>),
  ).toEqual({
    kind: "rejected",
  })
})

test("handles cancellation errors", () => {
  expect(getGeneralApiProblem({ problem: "CANCEL_ERROR" } as ApiErrorResponse<null>)).toEqual({
    kind: "canceled",
    temporary: true,
  })
})

test("handles parsed api response with success", () => {
  const data = {
    token: "sample token",
  }
  const response = parseApiResponse({
    ok: true,
    data,
  } as ApiResponse<any>)
  const parsedResponse = response((i) => i)
  expect(parsedResponse).toEqual({ kind: "ok", result: data })
})

test("handles parsed api response with error cannot-connect", () => {
  const data = {
    token: "sample token",
  }
  const response = parseApiResponse({
    problem: "NETWORK_ERROR",
  } as ApiResponse<any>)
  expect(response((i) => i)).toEqual({ temporary: true, kind: "cannot-connect" })
})
